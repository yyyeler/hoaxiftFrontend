import { useEffect, useState } from "react";
import { Input } from "@/shared/components/Input";
import { useTranslation } from "react-i18next";
import { Alert } from "@/shared/components/Alert";
import { login } from "./api"
import { Button } from "@/shared/components/Button";
import { useAuthDispatch } from "@/shared/components/state/context";
import { useNavigate } from "react-router-dom";

export function Login(){
    const [email,setEmail] = useState();
    const [password,setPassword] = useState();
    const [apiProgress,setApiProgress] = useState(false);
    const [errors, setErrors] = useState({});
    const [generalError, setGeneralError] = useState();
    const { t } = useTranslation();
    const navigete = useNavigate();
    
    const dispatch = useAuthDispatch();

    useEffect(() => {
        setErrors(function(lastErrors){
          return {
            ...lastErrors,
            email:undefined
          };
        });
      } , [email]);
  
      useEffect(() => {
        setErrors(function(lastErrors){
          return {
            ...lastErrors,
            password:undefined
          };
        });
      } , [password]);

      const onSubmit = async (event) => {
        event.preventDefault();
        setGeneralError();
        setApiProgress(true);

        try {
          const response = await login({
            email,
            password 
          });
          dispatch({type : 'login-success', data : response.data.user});
          navigete("/");
        } catch (axiosError){
          if(axiosError.response?.data)
          {
            if( axiosError.response.data.status === 400 )
              setErrors(axiosError.response.data.validationErrors); 
            else 
              setGeneralError(t(axiosError.response.data.message));
          }
          else
          {
            setGeneralError(t('genericError'));
          }
         
        } finally {
          setApiProgress(false);
        }
    } 
 


    return (
    <div className="container">
      <div className="col-lg-4 offset-lg-4 col-sm-8 offset-sm-2">
        <form className="card" onSubmit={onSubmit}>
          <div className="text-center card-header">
            <h1>{t('login')}</h1>
          </div>
          <div className="card-body">
            
            <Input id="email" label={t('email')} error={errors.email} 
            onChange={(event) => setEmail(event.target.value)} />

            <Input id="password" label={t('password')} error={errors.password} 
                        onChange={(event) => setPassword(event.target.value)} type="password"/>

            {generalError &&  (<Alert styleType="danger">{generalError}</Alert>)}

            <div className="text-center">
                <Button
                    disabled={!email || !password}
                    apiProgress={apiProgress}>
                    {t('login')}
                </Button>
            </div>
          </div>
        </form>
      </div>
    </div>
   )
}