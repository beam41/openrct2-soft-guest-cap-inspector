export function objEntries<T>(obj: { [p: string]: T }): [string, T][] {
  const ownProps = Object.keys(obj)
  let i = ownProps.length
  const resArray = new Array(i) // preallocate the Array
  while (i--)
    resArray[i] = [ownProps[i], obj[ownProps[i]]]

  return resArray
}
