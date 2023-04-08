import {
  RIDE_LIFECYCLE_BROKEN_DOWN,
  RIDE_LIFECYCLE_CRASHED,
  rideFlagsLow,
  RIDE_TYPE_FLAG_HAS_TRACK,
  RIDE_TYPE_FLAG_HAS_DATA_LOGGING,
  RIDE_LIFECYCLE_TESTED,
} from './reference'

export function getValidBonusRides(): Ride[] {
  return map.rides.filter(
    (ride) =>
      ride.status === 'open' &&
      !(ride.lifecycleFlags & RIDE_LIFECYCLE_BROKEN_DOWN) &&
      !(ride.lifecycleFlags & RIDE_LIFECYCLE_CRASHED)
  )
}

export function getOpenRides(): Ride[] {
  return map.rides.filter((ride) => ride.status === 'open')
}

export function getValidDifficultGuestGenerationBonusRides(validBonusRides: Ride[]): Ride[] {
  return validBonusRides.filter(
    (ride) =>
      ride.lifecycleFlags & RIDE_LIFECYCLE_TESTED &&
      rideFlagsLow[ride.type] & RIDE_TYPE_FLAG_HAS_TRACK &&
      rideFlagsLow[ride.type] & RIDE_TYPE_FLAG_HAS_DATA_LOGGING &&
      //ride.stations[0].segmentLength >= 600
      ride.excitement >= 600
  )
}

export function groupRideByName(rides: Ride[]): Map<string, Ride[]> {
  const groupMap = new Map<string, Ride[]>()
  for (const ride of rides) {
    const rideArr = groupMap.get(ride.object.name)
    if (rideArr) {
      rideArr.push(ride)
    } else {
      groupMap.set(ride.object.name, [ride])
    }
  }
  return groupMap
}

export function countBrokenDownRide(rides: Ride[]): number {
  let count = 0
  for (const ride of rides) {
    if (ride.lifecycleFlags & RIDE_LIFECYCLE_BROKEN_DOWN) {
      ++count
    }
  }
  return count
}

export function countCrashedRide(rides: Ride[]): number {
  let count = 0
  for (const ride of rides) {
    if (ride.lifecycleFlags & RIDE_LIFECYCLE_CRASHED) {
      ++count
    }
  }
  return count
}
