import {
  RIDE_LIFECYCLE_BROKEN_DOWN,
  RIDE_LIFECYCLE_CRASHED,
  RIDE_LIFECYCLE_TESTED,
  RIDE_TYPE_FLAG_HAS_DATA_LOGGING,
  RIDE_TYPE_FLAG_HAS_TRACK,
  rideBonusValues,
  rideFlagsLow,
} from './reference'

// taken from src/openrct2/world/Park.cpp (e6d439dc)
export function calculateSuggestedMaxGuests(): number {
  const difficultGuestGeneration = park.getFlag('difficultGuestGeneration')

  let suggestedMaxGuests = 0
  let difficultGenerationBonus = 0

  for (const ride of map.rides) {
    if (ride.status !== 'open') continue
    if (ride.lifecycleFlags & RIDE_LIFECYCLE_BROKEN_DOWN) continue
    if (ride.lifecycleFlags & RIDE_LIFECYCLE_CRASHED) continue

    // Add guest score for ride type
    suggestedMaxGuests += rideBonusValues[ride.type]

    // If difficult guest generation, extra guests are available for good rides
    if (difficultGuestGeneration) {
      if (!(ride.lifecycleFlags & RIDE_LIFECYCLE_TESTED)) continue
      if (!(rideFlagsLow[ride.type] & RIDE_TYPE_FLAG_HAS_TRACK)) continue
      if (!(rideFlagsLow[ride.type] & RIDE_TYPE_FLAG_HAS_DATA_LOGGING)) continue
      // segmentLength doesn't expose to plugins, so it doesn't work :(
      // if (ride.stations[0].segmentLength < 600) continue
      if (ride.excitement < 600) continue

      // Bonus guests for good ride
      difficultGenerationBonus += rideBonusValues[ride.type] * 2
    }
  }

  if (difficultGuestGeneration) {
    suggestedMaxGuests = Math.min(suggestedMaxGuests, 1000)
    suggestedMaxGuests += difficultGenerationBonus
  }

  suggestedMaxGuests = Math.min(suggestedMaxGuests, 65535)
  return suggestedMaxGuests
}
