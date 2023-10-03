import Box from "@commom/Box";
import KeyBoardSafe from "@reuse/KeyBoardSafe";
import Amount from "./Amount";
import FromSend from "./FromSend";
import Header from "./Header";
import ID from "./ID";
import Note from "./Note";
import Tips from "./Tips";
import Total from "./Total";
import TypeSend from "./TypeSend";
import { useState } from "react";
import { Profile } from "src/model/userModel";
import { useAppSelector, useTheme } from "@hooks/index";
import { kycUserSelector, profileUserSelector } from "@selector/userSelector";
import { useTranslation } from "react-i18next";
import contants from "@util/contants";
import Txt from "@commom/Txt";
import { fonts } from "@theme/fonts";
import Back from "@reuse/Back";
import Safe from "@reuse/Safe";

export default () => {
    const theme = useTheme()
    const { t } = useTranslation()
    const [netWork, setNetWork] = useState('TRC20')
    const [amount, setAmount] = useState('')
    const [symbol, setSymbol] = useState('USDT')
    const [toAddress, setToAddress] = useState('')

    const profile: Profile = useAppSelector<any>(profileUserSelector)
    const kyc = useAppSelector(kycUserSelector)

    return (
        <Box flex={1}>
            {contants.KYC_APPROVED != kyc ?
                <Safe paddingHorizontal={15}>
                    <Back size={16} />
                    <Box flex={1} alignCenter justifyCenter>
                        <Txt color={theme.black} fontFamily={fonts.AS} size={16}>
                            {t('You have not KYC yet')}
                        </Txt>
                    </Box>
                </Safe> :
                <>
                    <KeyBoardSafe>
                        <Box paddingHorizontal={10}>
                            <Header {...{ theme, t }} />
                            <ID {...{ toAddress, setToAddress, theme, t }} />
                            <TypeSend {...{ netWork, setNetWork, theme, t }} />
                            <Amount {...{ amount, setAmount, profile, theme, t }} />
                            <FromSend {...{ profile, theme, t }} />
                            <Tips {...{ theme, t }} />
                        </Box>
                    </KeyBoardSafe>
                    <Total
                        {...{
                            t,
                            theme,
                            symbol,
                            amount,
                            netWork,
                            toAddress,
                        }}
                    />
                </>
            }
        </Box>
    )
}