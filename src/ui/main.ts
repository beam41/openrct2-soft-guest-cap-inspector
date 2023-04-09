import { window, WindowTemplate, store, label, listview } from 'openrct2-flexui'
import {
  countBrokenDownRide,
  countCrashedRide,
  getOpenRides,
  getValidBonusRidesFromOpenRide,
  groupRideByType,
} from '@/src/core/list'
import { rideBonusValues } from '@/src/core/reference'
import { objEntries } from '@/src/lib/objEntries'

type SummaryItemsItem = [string, string, string, string, string, string]

export function mainUI(): WindowTemplate {
  const summaryItems = store<SummaryItemsItem[]>([])
  const currentSuggestedGuestMaximumText = store<string>('')
  let currentSuggestedGuestMaximum = -1

  const reCalculate = () => {
    if (currentSuggestedGuestMaximum !== park.suggestedGuestMaximum) {
      currentSuggestedGuestMaximum = park.suggestedGuestMaximum
      const openRides = getOpenRides()
      const bonusRidesGroup = objEntries(groupRideByType(openRides))
      const newItems = Array<SummaryItemsItem>(bonusRidesGroup.length)
      for (let i = 0; i < newItems.length; i++) {
        const [type, rides] = bonusRidesGroup[i]
        const bonusValue = rideBonusValues[rides[0].type]
        const broken = countBrokenDownRide(rides)
        const crashed = countCrashedRide(rides)
        newItems[i] = [
          type,
          bonusValue.toString(),
          rides.length.toString(),
          broken.toString(),
          crashed.toString(),
          (bonusValue * (rides.length - (broken + crashed))).toString(),
        ]
      }
      summaryItems.set(newItems)
      const sumBonus = getValidBonusRidesFromOpenRide(openRides).reduce(
        (prev, curr) => prev + rideBonusValues[curr.type],
        0
      )
      currentSuggestedGuestMaximumText.set(
        `Current soft guest cap: ${currentSuggestedGuestMaximum}` +
          (sumBonus !== currentSuggestedGuestMaximum
            ? ` {RED}(Table is inaccurate)`
            : ' {GREEN}(Table is accurate)')
      )
    }
  }

  return window({
    title: 'Soft Guest Cap Inspector',
    width: 475,
    height: 250,
    minWidth: 400,
    minHeight: 200,
    maxWidth: 550,
    maxHeight: 500,
    padding: 5,
    content: [
      label({
        visibility: park.getFlag('difficultGuestGeneration') ? 'visible' : 'none',
        text: '{RED}!! {WHITE}This park has Harder guest generation enabled, result might not be accurate.',
        alignment: 'left',
        height: 12,
        padding: { bottom: 2 },
      }),
      listview({
        isStriped: true,
        columns: [
          {
            header: 'Type',
            width: '100%',
            canSort: true,
          },
          {
            header: 'Bonus',
            width: 50,
            canSort: true,
          },
          {
            header: 'Amount',
            width: 50,
            canSort: true,
          },
          {
            header: 'Broken',
            width: 50,
            canSort: true,
          },
          {
            header: 'Crashed',
            width: 50,
            canSort: true,
          },
          {
            header: 'Sum Bonus',
            width: 75,
            canSort: true,
          },
        ],
        items: summaryItems,
        padding: { bottom: 2 },
      }),
      label({
        text: currentSuggestedGuestMaximumText,
        alignment: 'centred',
        height: 12,
        padding: { bottom: 2 },
      }),
      label({
        text: '{YELLOW}Soft guest cap is updated every ~13 seconds.',
        alignment: 'centred',
        height: 12,
      }),
    ],
    onUpdate: () => reCalculate(),
  })
}
