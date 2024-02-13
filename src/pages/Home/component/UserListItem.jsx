import { ProfileImage } from "@/shared/components/ProfileImage";
import { Link } from "react-router-dom";

export function UserListItem({ user }){

    return (
    <Link 
     to={`/user/${user.id}`}
     className="list-group-item list-group-item-action"
     style={{textDecoration:'none'}}>
        <ProfileImage width={30}/>

        <span className="ms-2">{user.username}</span>            
    </Link>
        
    );
}