import viteSvgIcons  from 'vite-plugin-svg-icons'
import path from 'path'

export function configSvgPlugin(isBuild:boolean) {
    const svgPlugin = viteSvgIcons({
        iconDirs: [path.resolve(process.cwd(), 'src/assets/icons')],
        svgoOptions: isBuild, // 压缩选项
        symbolId: 'icon-[dir]-[name]',
    })
    return svgPlugin
}