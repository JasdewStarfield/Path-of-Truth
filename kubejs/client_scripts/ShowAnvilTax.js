ItemEvents.tooltip(reg => {
    reg.addAdvancedToAll((stack, _, tooltip) => {
        let tax = stack.nbt?.RepairCost
        if (tax) tooltip.add(Text.translate('tooltip.anvil.tax', String(tax)).red())
    })
})
