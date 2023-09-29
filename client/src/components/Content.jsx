import { useGetMessageQuery } from "../api/message";
export default function Content() {

    const { data, isLoading } = useGetMessageQuery()

    if(isLoading){
        return <h1>Loading ...</h1>
    }else{
        console.log(data)
    }
  return (
    <h1>JE SUIS TEST</h1>
  )
}
