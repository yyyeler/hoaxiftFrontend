import { Button } from "@/shared/components/Button";
import { Input } from "@/shared/components/Input";
import { useTranslation } from "react-i18next";
import {
  useAuthDispatch,
  useAuthState,
} from "@/shared/components/state/context";
import { updateUser } from "./api";
import { Alert } from "@/shared/components/Alert";
import { useState } from "react";

export function UserEditForm({setEditMode , setTempImage}) {
  const { t } = useTranslation();
  const authState = useAuthState();
  const [apiProgress, setApiProgress] = useState(false);
  const [errors, setErrors] = useState({});
  const [generalError, setGeneralError] = useState();
  const [newUsername, setNewUsername] = useState(authState.username);
  const dispatch = useAuthDispatch();
  const [newImage,setNewImage] = useState();

  const onChangedUsername = (event) => {
    setNewUsername(event.target.value);
    setErrors(function(lastErrors){
      return {
        ...lastErrors,
        username:undefined
      };
    });
    
  };

  const onClickCancel = () => {
    setEditMode(false);
    setNewUsername(authState.username);
    setNewImage();
    setTempImage();
  };

  const onSelectImage = (event) => {
    setErrors(function(lastErrors){
      return {
        ...lastErrors,
        image:undefined
      };
    });

    if(event.target.files.length < 1) return;

    const file = event.target.files[0]; 
    const fileReader = new FileReader();

    fileReader.onloadend = () =>
    {
      const data = fileReader.result;
      setNewImage(data);
      setTempImage(data);
    }

    fileReader.readAsDataURL(file);
  };

  const onSubmit = async (event) => {
    event.preventDefault();
    setApiProgress(true);
    setGeneralError();
    setErrors({});
    try {
      const { data } = await updateUser(authState.id, { username: newUsername, image: newImage });
      dispatch({
        type: "user-update-success",
        data: { username: data.username, image: data.image },
      });
      setEditMode(false);
    } catch (axiosError) {
      if (axiosError.response?.data) {
        if (axiosError.response.data.status === 400)
          setErrors(axiosError.response.data.validationErrors);
        else setGeneralError(t(axiosError.response.data.message));
      } else {
        setGeneralError(t("genericError"));
      }
    } finally {
      setApiProgress(false);
    }
  };

  return (
    <form onSubmit={onSubmit}>
      <Input
        defaultValue={authState.username}
        label={t("username")}
        onChange={onChangedUsername}
        error={errors.username}
      />

      <Input 
        label={t("profileImage")} 
        type="file" 
        onChange={onSelectImage} 
        error={errors.image}
      /> 

      {generalError && <Alert styleType="danger">{generalError}</Alert>}

      <Button apiProgress={apiProgress} type="submit">
        Save
      </Button>
      <div className="d-inline m-1"></div>
      <Button styleType="outline-secondary" onClick={onClickCancel} type="button">
        Cancel
      </Button>
    </form>
  );
}
