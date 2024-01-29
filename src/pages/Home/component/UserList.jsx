import { useCallback, useEffect, useState } from "react";
import { getAllUsers } from "./api";
import { Spinner } from "@/shared/components/Spinner";
import { UserListItem } from "./UserListItem";
import { useTranslation } from "react-i18next";

export function UserList(){

    const [ userPage, setUserPage] = useState({
        content:[],
        last:false,
        first:false,
        number:0
    });

    const getUsers = useCallback(async (page) => {
        setApiProgress(true);
        try {
            const response = await getAllUsers(page);
            setUserPage(response.data);
        } catch (error) {
            
        }finally{
            setApiProgress(false);
        }
        
    },[]);

    const [apiProgress,setApiProgress] = useState(false);

    const { t } = useTranslation();

    useEffect (() => {
        getUsers();
    },[]);

    return(
        <div className="card">
            <div className="card-header text-center fs-4">{t('userList')}</div>
            <ul className="list-group list-group-flush">
                {
                    userPage.content.map(user => {
                        return <UserListItem key={user.id} user={user} />
                    })
                }
            </ul>
           <div className="card-footer text-center">
                {apiProgress && <Spinner /> }
                {!apiProgress && !userPage.first && <button className="btn btn-outline-secondary btn-sm float-start" onClick={() => getUsers(userPage.number-1)}>Previous</button>}
                {!apiProgress && !userPage.last && <button className="btn btn-outline-secondary btn-sm float-end" onClick={() => getUsers(userPage.number+1)}>Next</button>}
           </div>
            
        </div>
    );
}