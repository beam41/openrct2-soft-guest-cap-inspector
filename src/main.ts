import { mainUI } from '@/src/ui/main'

export function main(): void {
  ui.registerMenuItem('Inspect soft guest cap', () => {
    mainUI().open()
  })
}
