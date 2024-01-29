import { Spinner } from "@/shared/components/Spinner";
import defaultProfileImage from "@/assets/profile.png"
import { getUserById } from "./api";
import { Alert } from "@/shared/components/Alert";
import { useRouteParamsApiRequest } from "@/shared/components/hooks/useRouteParamsApiRequest";
import { ProfileCard } from "./Component/ProfileCard";

export function User(){

    const {apiProgress, data: user, error} = useRouteParamsApiRequest('id',getUserById);

    return (
    <>
        {apiProgress && 
            <Alert styleType="secondary"><Spinner /></Alert>} 
        {user && <ProfileCard user={user} />}
        {error && (<Alert styleType="danger">{error}</Alert>)} 
        
    </>
       
    )
}