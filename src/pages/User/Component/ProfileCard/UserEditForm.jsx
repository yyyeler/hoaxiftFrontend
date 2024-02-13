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

export function UserEditForm({setEditMode}) {
  const { t } = useTranslation();
  const authState = useAuthState();
  const [apiProgress, setApiProgress] = useState(false);
  const [errors, setErrors] = useState({});
  const [generalError, setGeneralError] = useState();
  const [newUsername, setNewUsername] = useState(authState.username);
  const dispatch = useAuthDispatch();

  const onChangedUsername = (event) => {
    setNewUsername(event.target.value);
    setErrors({});
  };

  const onClickCancel = () => {
    setEditMode(false);
    setNewUsername(authState.username);
  };

  const onSubmit = async (event) => {
    event.preventDefault();
    setApiProgress(true);
    setGeneralError();
    setErrors({});
    try {
      await updateUser(authState.id, { username: newUsername });
      dispatch({
        type: "user-update-success",
        data: { username: newUsername },
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
