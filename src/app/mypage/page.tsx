import { LoginCheck } from "@/commons/hocs/loginCheck";
import { MyPage } from "@/components/myPages";

const myPage = () => {
    return (
        <>
            <MyPage />
        </>
    );
};

export default LoginCheck(myPage);
