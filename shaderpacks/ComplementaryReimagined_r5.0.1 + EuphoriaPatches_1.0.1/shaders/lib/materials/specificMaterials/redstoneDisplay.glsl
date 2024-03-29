#ifdef REDSTONE_IPBR
if (mat == 10312 || mat == 10156 || mat == 10164 || mat == 10180 || mat == 10188 || mat == 10196 || mat == 10204 || mat == 10080 || mat == 10730 || mat == 10665 || blockEntityId == 60008 || mat == 10153){
    if (color.r * REDSTONE_IPBR_R > 2.68 * color.g * REDSTONE_IPBR_G + 2.68 * color.b * REDSTONE_IPBR_B) {
        color.rgb *= color.rgb;
        emission = 4.0 * REDSTONE_IPBR_I;
    }
} else {
    if (color.r * REDSTONE_IPBR_R > color.g * REDSTONE_IPBR_G + color.b * REDSTONE_IPBR_B) {
        color.rgb *= color.rgb;
        emission = 4.0 * REDSTONE_IPBR_I;
    }
}
#endif