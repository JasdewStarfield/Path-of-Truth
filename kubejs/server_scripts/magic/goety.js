//需求配方列表
    //魔力粉-奥术源质兑换
    //幽匿催发体炼制
    //酋长蟹炼制
    //碎铁矿兑换炙铁碎矿
    //榴石，月长和透辉的兑换
    //史莱姆球兑换末影之眼
    //熔岩瓶子提取恶魂之泪
    //虚空蠕虫之眼制造瞻远者刷怪蛋
    //箱子炼制宝箱怪
    //追加一个肉块配方
    //潜影盒活化为潜影贝
    //紫水晶母岩合成
    //魔力风暴催化
    //复刻凝胶变化
    //雷电瓶生成
    //硫磺转烈焰粉
    //盖亚之魂合成奥术残骸
    //灰烬源质转化
    //原版蘑菇-双孢菇转化
    //海潮蛤-鹦鹉螺壳转化
    //点铁成金
    //点金成钻
    //点盖亚成下界合金
    //点下界合金成遗忆锭
    //下界合金盔甲注入盖亚之魂活化
    //姜饼人活化
    //点铁成缪铁
    //点钻成绛紫晶
    //磁铁升级（红石-铁金）
    //龙蛋催化
    //凋零骷髅刷怪蛋合成
    //下界之星聚合
    //紫水晶母岩聚合
    //增生之种产出
    //恶魔合金复制
    //磁铁系列升级（无-红石，铁金-钻）
    //矿物处理（其他矿脉适配）
    //感谢工业完成的碎矿，这样魔法就可以直接接入了
    //榴石，月长石，透辉石，霜钢，扼塞，缪铁，镰鼬铁，炙铁，绛紫晶，天闪石，锌，锡

ServerEvents.recipes(event => {
    //根之图腾移除与合成
    //根之图腾移除
    event.remove({output:'goety:totem_of_roots'})
    //根之图腾合成
    event.shaped(
        Item.of('goety:totem_of_roots'),
        [
            ' A ',
            'BCB',
            ' D '
        ],
        {
            B: '#botania:livingwood_logs',
            A: 'irons_spellbooks:arcane_essence',
            C: 'irons_spellbooks:copper_spell_book',
            D: 'botania:livingrock'
        }
    )
    
    
    //灵魂图腾移除与新激活
    event.remove({output:'goety:totem_of_souls'})
    //耗尽的灵魂图腾合成
    event.shaped(
        Item.of('goety:spent_totem'),
        [
            ' A ',
            'BCB',
            ' D '
        ],
        {
            A: 'irons_spellbooks:arcane_ingot',
            C: 'goety:magic_emerald',
            D: 'goety:totem_of_roots',
            B: 'botania:livingrock'
        }
    )
    //灵魂图腾合成
    event.shaped(
        Item.of('goety:totem_of_souls'),
        [
            'A A',
            ' B ',
            '   '
        ],
        {
            B: 'goety:spent_totem',
            A: 'goety:magic_emerald'
        }
    )
    
    //魔力粉-奥术源质兑换
})