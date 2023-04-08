import {
  countBrokenDownRide,
  countCrashedRide,
  getOpenRides,
  getValidBonusRides,
  groupRideByName,
} from '@/src/core/list'
import { rideBonusValues } from '@/src/core/reference'

export function main(): void {
  let softGuestCap = -1
  context.subscribe('interval.tick', () => {
    if (softGuestCap !== park.suggestedGuestMaximum) {
      console.log(park.suggestedGuestMaximum)
      const bonusRides = getOpenRides()
      const bonusRidesGroup = groupRideByName(bonusRides)
      for (const [name, rides] of bonusRidesGroup) {
        const validBonusRidesCount =
          rides.length - countBrokenDownRide(rides) - countCrashedRide(rides)
        console.log(
          name,
          rides.length,
          validBonusRidesCount,
          rideBonusValues[rides[0].type],
          rideBonusValues[rides[0].type] * validBonusRidesCount
        )
      }

      softGuestCap = park.suggestedGuestMaximum
    }
  })
}
