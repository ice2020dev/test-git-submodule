 const withInstall = <T, E extends Record<string, any>>(
    main: T,
    extra?: E
  ) => {
    ;(main as any).install = (app): void => {
      for (const comp of [main, ...Object.values(extra ?? {})]) {
        app.component(comp.name, comp)
      }
    }
  
    if (extra) {
      for (const [key, comp] of Object.entries(extra)) {
        ;(main as any)[key] = comp
      }
    }
    return main as SFCWithInstall<T> & E
  }
  
  
  const makeInstall = <T, E extends Record<string, any>>(
    main: T,
    extra?: E
  ) => {
    ;(main as any).install = (app): void => {
      for (const comp of [main, ...Object.values(extra ?? {})]) {
        app.component(comp.name, comp)
      }
    }
  
    if (extra) {
      for (const [key, comp] of Object.entries(extra)) {
        ;(main as any)[key] = comp
      }
    }
    return main as SFCWithInstall<T> & E
  }
import singleLineComponent from './src/index.vue'

export const dsLine = withInstall(singleLineComponent)
export default dsLine

export * from './src/index.vue'
