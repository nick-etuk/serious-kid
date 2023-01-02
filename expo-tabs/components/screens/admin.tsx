import { Button } from "react-native"
import { apiSlice } from "../../store/features/api/api-slice"
import { useAppDispatch } from "../../store/hooks"


export function Admin({ route, navigation }: any /*todo remove 'any' see TabOnescreen */) {
  const dispatch = useAppDispatch()

  function handleClick() {
    /**
     * This will update the cache data for the query corresponding to the `getPosts` endpoint,
     * when that endpoint is used with no argument (undefined).
     */
    const patchCollection = dispatch(
      apiSlice.util.updateQueryData('getSnippets', undefined, (draftPosts) => {
        draftPosts.push({ id: 1, name: 'Teddy' })
      })
    )
  }

    return (
        <>
            <Button title={'Stages'} onPress={() => navigation.navigate('Stages')}                />
            <Button title={'Clear RTK Cache'} onPress={handleClick}/>
        </>
    )
}