import {
  RIDE_LIFECYCLE_BROKEN_DOWN,
  RIDE_LIFECYCLE_CRASHED,
  rideFlagsLow,
  RIDE_TYPE_FLAG_HAS_TRACK,
  RIDE_TYPE_FLAG_HAS_DATA_LOGGING,
  RIDE_LIFECYCLE_TESTED,
} from './reference'

export function getValidBonusRide(): Ride[] {
  return map.rides.filter(
    (ride) =>
      ride.status === 'open' &&
      !(ride.lifecycleFlags & RIDE_LIFECYCLE_BROKEN_DOWN) &&
      !(ride.lifecycleFlags & RIDE_LIFECYCLE_CRASHED)
  )
}

export function getValidDifficultGuestGenerationBonusRide(validBonusRide: Ride[]): Ride[] {
  return validBonusRide.filter(
    (ride) =>
      ride.lifecycleFlags & RIDE_LIFECYCLE_TESTED &&
      rideFlagsLow[ride.type] & RIDE_TYPE_FLAG_HAS_TRACK &&
      rideFlagsLow[ride.type] & RIDE_TYPE_FLAG_HAS_DATA_LOGGING &&
      //ride.stations[0].segmentLength >= 600
      ride.excitement >= 600
  )
}
