import Root from "@/components/Root";
import { useAuth } from "@/context/authContext";
import { UserType } from "@/firebase/user/user";
import IndexCompany from "./company";
import IndexClient from "./client";
import IndexEmployee from "./employee";
import React from "react";
import Loading from "@/components/ui/Loading";
import { Redirect } from "expo-router";
import { Paths } from "@/constants/Paths";

export default function Index() {
    const [user, loading] = useAuth();

    if (loading) {
      return <Loading />;
    }

    if (!user) {
        return <Redirect href={Paths.LOGIN}/>
    }

    let screen: React.JSX.Element | null = null;

    if (user?.tipoUsuario === UserType.EMPRESA) {
        screen = <IndexCompany />
    }
    if (user?.tipoUsuario === UserType.CLIENTE) {
        screen = <IndexClient />
    }
    if (user?.tipoUsuario === UserType.FUNCIONARIO) {
        screen = <IndexEmployee />
    }

    return (
        <Root accountButton requireAuth>
            { screen }
        </Root>
    )
}