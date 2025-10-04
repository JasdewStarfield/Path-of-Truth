// requires: villagercomfort
{
    // batch import
    // search: import (.+\.(.+));
    // replace: $2: Java.loadClass('$1'),
    let ModCapabilities = Java.loadClass('dev.ghen.villagercomfort.common.capabilty.ModCapabilities')
    let CommonConfig = Java.loadClass('dev.ghen.villagercomfort.core.config.CommonConfig')
    let MathHelper = Java.loadClass('dev.ghen.villagercomfort.core.math.MathHelper')
    let MemoryModuleType = Java.loadClass('net.minecraft.world.entity.ai.memory.MemoryModuleType')
    let WorkplaceComfortValues = Java.loadClass('dev.ghen.villagercomfort.comfort.WorkplaceComfortValues')

    // do comfort check
    // https://gitlab.com/leahx_y2k/villager-comfort-updated/-/blob/main/src/main/java/dev/ghen/villagercomfort/comfort/ComfortHelper.java
    let checkComfort = (/**@type {Internal.Villager}*/ villager, checker) => {
        if (villager.type != 'minecraft:villager')
            return checker.tell(Text.translate('villagercomfort.ext.error.invalid', villager.name).gold())

        let comfortChangedChecker = {
            _comfort: 0,
            reason: 'init',
        }
        Object.defineProperty(comfortChangedChecker, 'comfort', {
            get() {
                return this._comfort
            },
            set(v) {
                let oldComfort = this._comfort
                let newComfort = v
                let delta = newComfort - oldComfort
                let msg = Text.translate(
                    'villagercomfort.ext.formula',
                    Text.translate(`villagercomfort.ext.target.${this.reason}`),
                    String(oldComfort),
                    delta > 0 ? '+' : delta < 0 ? '-' : '±',
                    String(Math.abs(delta)),
                    String(newComfort),
                )
                if (delta > 0) msg = msg.green()
                else if (delta < 0) msg = msg.red()
                checker.tell(msg)
                this._comfort = v
            },
        })

        // use imports
        let cap = villager.getCapability(ModCapabilities.COMFORT_VALUES_CAP).orElse(null)
        if (!cap) return checker.tell(Text.translate('villagercomfort.ext.error.missing_cap').gold())

        // title
        let header = Text.translate('villagercomfort.ext.header', villager.name)
        checker.tell(header)
        let current_day = Math.floor(villager.level.getDayTime() / 24000)
        let last_sleep_day = cap.getLastSleepDay()
        let days_without_sleep = current_day - last_sleep_day - 1
        let has_bed = cap.getBedsCount() > 0 && days_without_sleep <= 0

        let has_workplace = villager.getBrain().hasMemoryValue(MemoryModuleType.JOB_SITE) && cap.getWorkstationsCount() > 0

        with (comfortChangedChecker) {
            // bedroom related
            if (has_bed) {
                reason = 'BEDROOM_SIZE'
                if (cap.getBedroomSize() >= CommonConfig.PREFERRED_BEDROOM_SIZE.get().intValue()) {
                    comfort += MathHelper.interpolate(
                        cap.getBedroomSize(),
                        CommonConfig.PREFERRED_BEDROOM_SIZE.get().intValue(),
                        CommonConfig.MAX_BEDROOM_SIZE.get().intValue(),
                        0,
                        CommonConfig.MAX_BEDROOM_SIZE_COMFORT.get().intValue(),
                    )
                } else {
                    comfort += MathHelper.interpolate(
                        cap.getBedroomSize(),
                        CommonConfig.PREFERRED_BEDROOM_SIZE.get().intValue(),
                        CommonConfig.MIN_BEDROOM_SIZE.get().intValue(),
                        0,
                        CommonConfig.MIN_BEDROOM_SIZE_COMFORT.get().intValue(),
                    )
                }

                //beds
                reason = 'BED_COUNT'
                if (cap.getBedsCount() > CommonConfig.BEDS_THRESHOLD.get().intValue()) {
                    comfort +=
                        (cap.getBedsCount() - CommonConfig.BEDS_THRESHOLD.get().intValue()) * CommonConfig.COMFORT_PER_BED.get().intValue()
                }

                //bedroom light
                reason = 'BEDROOM_LIGHT'
                if (cap.getBedroomLight() > CommonConfig.PREFERRED_BEDROOM_LIGHT.get().intValue()) {
                    comfort +=
                        (cap.getBedroomLight() - CommonConfig.PREFERRED_BEDROOM_LIGHT.get().intValue()) *
                        CommonConfig.COMFORT_PER_MORE_BEDROOM_LIGHT.get().intValue()
                } else if (cap.getBedroomLight() < CommonConfig.PREFERRED_BEDROOM_LIGHT.get().intValue()) {
                    comfort +=
                        (CommonConfig.PREFERRED_BEDROOM_LIGHT.get().intValue() - cap.getBedroomLight()) *
                        CommonConfig.COMFORT_PER_LESS_BEDROOM_LIGHT.get().intValue()
                }

                //workstation in bedroom
                reason = 'WORKSTATION_IN_BEDROOM'
                if (cap.getIsWorkstationInBedroom()) {
                    comfort += CommonConfig.WORKSTATION_IN_BEDROOM_COMFORT.get().intValue()
                }
            }

            // https://gitlab.com/leahx_y2k/villager-comfort-updated/-/commit/2281f5b0b65135e09a46fffd6044fa9294b86db3
            if (Platform.mods.villagercomfort.version > '1.20.1-1.1.0' && villager.getBrain().hasMemoryValue(MemoryModuleType.JOB_SITE)) {
                if (cap.getWorkstationsCount() == 0) {
                    villager
                        .getBrain()
                        .getMemory(MemoryModuleType.JOB_SITE)
                        .ifPresent(workstation => {
                            cap.last_remembered_workstation_pos = workstation.pos().asLong()
                        })

                    WorkplaceComfortValues.setValuesToCap(villager, cap)
                } else {
                    villager
                        .getBrain()
                        .getMemory(MemoryModuleType.JOB_SITE)
                        .ifPresent(workstation => {
                            let workstation_pos = workstation.pos().asLong()

                            if (workstation_pos != cap.last_remembered_workstation_pos) {
                                cap.last_remembered_workstation_pos = workstation_pos
                                WorkplaceComfortValues.setValuesToCap(villager, cap)
                            }
                        })
                }
            }

            //workplace related
            if (has_workplace) {
                reason = 'WORKPLACE_SIZE'
                if (cap.getWorkplaceSize() >= CommonConfig.PREFERRED_WORKPLACE_SIZE.get().intValue()) {
                    comfort += MathHelper.interpolate(
                        cap.getWorkplaceSize(),
                        CommonConfig.PREFERRED_WORKPLACE_SIZE.get().intValue(),
                        CommonConfig.MAX_WORKPLACE_SIZE.get().intValue(),
                        0,
                        CommonConfig.MAX_WORKPLACE_SIZE_COMFORT.get().intValue(),
                    )
                } else {
                    comfort += MathHelper.interpolate(
                        cap.getWorkplaceSize(),
                        CommonConfig.PREFERRED_WORKPLACE_SIZE.get().intValue(),
                        CommonConfig.MIN_WORKPLACE_SIZE.get().intValue(),
                        0,
                        CommonConfig.MIN_WORKPLACE_SIZE_COMFORT.get().intValue(),
                    )
                }

                //workstations
                reason = 'WORKSTATION_COUNT'
                if (cap.getWorkstationsCount() > CommonConfig.WORKSTATIONS_THRESHOLD.get().intValue()) {
                    comfort +=
                        (cap.getWorkstationsCount() - CommonConfig.WORKSTATIONS_THRESHOLD.get().intValue()) *
                        CommonConfig.COMFORT_PER_WORKSTATION.get().intValue()
                }

                //workplace light
                reason = 'WORKPLACE_LIGHT'
                if (cap.getWorkplaceLight() > CommonConfig.PREFERRED_WORKPLACE_LIGHT.get().intValue()) {
                    comfort +=
                        (cap.getWorkplaceLight() - CommonConfig.PREFERRED_WORKPLACE_LIGHT.get().intValue()) *
                        CommonConfig.COMFORT_PER_MORE_WORKPLACE_LIGHT.get().intValue()
                } else if (cap.getWorkplaceLight() < CommonConfig.PREFERRED_WORKPLACE_LIGHT.get().intValue()) {
                    comfort +=
                        (CommonConfig.PREFERRED_WORKPLACE_LIGHT.get().intValue() - cap.getWorkplaceLight()) *
                        CommonConfig.COMFORT_PER_LESS_WORKPLACE_LIGHT.get().intValue()
                }
            }

            // distance between a villager's bed and their workplace
            if (has_bed && has_workplace) {
                reason = 'WORK_DISTANCE'
                if (cap.getBedWorkstationDistance() >= CommonConfig.PREFERRED_BED_WORKPLACE_DISTANCE.get().intValue()) {
                    comfort += MathHelper.interpolate(
                        cap.getBedWorkstationDistance(),
                        CommonConfig.PREFERRED_BED_WORKPLACE_DISTANCE.get().intValue(),
                        CommonConfig.MAX_BED_WORKPLACE_DISTANCE.get().intValue(),
                        0,
                        CommonConfig.MAX_BED_WORKPLACE_DISTANCE_COMFORT.get().intValue(),
                    )
                } else {
                    comfort += MathHelper.interpolate(
                        cap.getBedWorkstationDistance(),
                        CommonConfig.PREFERRED_BED_WORKPLACE_DISTANCE.get().intValue(),
                        CommonConfig.MIN_BED_WORKPLACE_DISTANCE.get().intValue(),
                        0,
                        CommonConfig.MIN_BED_WORKPLACE_DISTANCE_COMFORT.get().intValue(),
                    )
                }
            }

            // days without outside
            let days_without_outside = current_day - cap.last_day_outside - 1

            reason = 'DAYS_OUTSIDE'
            if (days_without_outside >= CommonConfig.MAX_DAYS_WITHOUT_OUTSIDE.get().intValue()) {
                comfort +=
                    CommonConfig.MAX_DAYS_WITHOUT_OUTSIDE.get().intValue() * CommonConfig.COMFORT_PER_DAY_WITHOUT_OUTSIDE.get().intValue()
            } else if (days_without_outside > 0) {
                comfort += days_without_outside * CommonConfig.COMFORT_PER_DAY_WITHOUT_OUTSIDE.get().intValue()
            }

            // days without zombie attacks
            let days_without_zombie = current_day - cap.getLastZombieDay() - 1

            reason = 'DAYS_WITHOUT_ZOMBIE'
            if (days_without_zombie >= CommonConfig.MAX_DAYS_WITHOUT_PANIC.get().intValue()) {
                comfort +=
                    CommonConfig.MAX_DAYS_WITHOUT_PANIC.get().intValue() * CommonConfig.COMFORT_PER_DAY_WITHOUT_PANIC.get().intValue()
            } else if (days_without_zombie > 0) {
                comfort += days_without_zombie * CommonConfig.COMFORT_PER_DAY_WITHOUT_PANIC.get().intValue()
            }

            // days without sleeping
            reason = 'DAYS_WITHOUT_SLEEP'
            last_sleep_day = cap.getLastSleepDay()
            days_without_sleep = current_day - last_sleep_day - 1

            if (days_without_sleep > 0) {
                comfort += days_without_sleep * CommonConfig.COMFORT_PER_DAY_WITHOUT_SLEEP.get().intValue()
            }

            _comfort = KMath.clamp(
                comfort,
                -CommonConfig.MAX_COMFORT_RANGE.get().intValue(),
                CommonConfig.MAX_COMFORT_RANGE.get().intValue(),
            )

            checker.tell(Text.translate('villagercomfort.ext.summary', String(comfort)).yellow())
            villager.potionEffects.add('glowing', 10)
        }
    }

    // TODO 换成专门道具
    ItemEvents.rightClicked('poppy', e => {
        let { player } = e
        let { entity } = player.rayTrace(32, false)
        if (!entity) return
        try {
            checkComfort(entity, player)
        } catch (e) {
            player.tell(e)
        }
    })
}
