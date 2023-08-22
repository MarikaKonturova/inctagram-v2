import React, {FC, useEffect, useState} from 'react';
import {useRouter} from "next/router";
import {useGoogleAuth} from "../model";
import Google from 'shared/assets/icons/general/google.svg'
import {routerPush} from "../../../../../shared/lib/routerPush/routerPush";
import {Button, Modal} from "../../../../../shared/ui";
import {AppRoutes} from "../../../../../shared/config/routeConfig/path";


export interface GoogleAndGitHubAuthProps {
    type: 'Registration' | 'Login'
}
export const GoogleAuth:FC<GoogleAndGitHubAuthProps> = ({type}) => {

    const [modal,setModal] = useState({
        modalOpen:false,
        title:''
    })

    const { query } = useRouter()

    const queryStatus = query['status_code'] as string

    const {refetch} = useGoogleAuth({type})


    useEffect(() => {

        if(!queryStatus) return

        if(queryStatus === '200'){
           setModal({
               modalOpen: true,
               title: 'Success'
           })
             routerPush(AppRoutes.PROFILE_SETTINGS.GENERAL_INFORMATION)
        }

        if(queryStatus === '401'){
            setModal({
                modalOpen: true,
                title: 'Unauthorized , go to sign up page to make registration'
            })
        }

        if(queryStatus === '400'){
            setModal({
                modalOpen: true,
                title: 'User is already registered'
            })
        }

        if(queryStatus === '204'){
            setModal({
                modalOpen: true,
                title: 'An email with a verification code has been sent to the your email address'
            })
        }

    },[queryStatus] );


    return (
        <>
            {
                modal.modalOpen &&
                <Modal isOpen={modal.modalOpen} title={'Registration'} onClose={() => setModal({
                    title: '',
                    modalOpen: false
                })}>
                    <div style={{display:'flex', alignItems:'center',justifyContent:'center',flexDirection:'column',padding:'20px',gap:'20px'}}>
                        {modal.title}
                        <Button onClick={() => setModal({
                            title: '',
                            modalOpen: false
                        })}>Ok</Button>
                    </div>
                </Modal>
            }
            <div onClick={()=> refetch()}>
                <Google/>
            </div>
        </>
    );
};

