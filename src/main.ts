import { getValidBonusRide, getValidDifficultGuestGenerationBonusRide } from '@/src/core/list'
import { rideBonusValues } from '@/src/core/reference'

export function main(): void {
  let softGuestCap = -1
  context.subscribe('interval.tick', () => {
    if (softGuestCap !== park.suggestedGuestMaximum) {
      console.log(park.suggestedGuestMaximum)
      const bonusRides = getValidBonusRide()
      const bonus = bonusRides.reduce(
        (previousValue, currentValue) => previousValue + rideBonusValues[currentValue.type],
        0
      )

      const hardbonus = getValidDifficultGuestGenerationBonusRide(bonusRides).reduce(
        (previousValue, currentValue) => previousValue + rideBonusValues[currentValue.type] * 2,
        0
      )
      console.log(bonus + hardbonus)

      softGuestCap = park.suggestedGuestMaximum
    }
  })
}
