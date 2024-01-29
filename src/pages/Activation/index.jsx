import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { activateUser } from "./api.js";
import { Alert } from "@/shared/components/Alert.jsx";
import { Spinner } from "@/shared/components/Spinner.jsx";
import { useRouteParamsApiRequest } from "@/shared/components/hooks/useRouteParamsApiRequest.js";

export function Activation() {

    const {apiProgress, data, error} = useRouteParamsApiRequest ('token',activateUser);

    return (<>
        {apiProgress && (
            <Alert styleType="secondary" center>
                <Spinner/>
            </Alert>
            )}
                
        {data?.message && (<Alert>{data.message}</Alert>)}

        {error && (<Alert styleType="danger">{error}</Alert>)}        
    </>)
}