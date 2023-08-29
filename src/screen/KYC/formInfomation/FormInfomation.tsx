import { checKYCUserThunk } from '@asyncThunk/userAsyncThunk'
import Box from '@commom/Box'
import Btn from '@commom/Btn'
import Txt from '@commom/Txt'
import { useAppDispatch, useAppSelector, useTheme } from '@hooks/index'
import { goBack } from '@navigation/navigationRef'
import KeyBoardSafe from '@reuse/KeyBoardSafe'
import LoadingBlack from '@reuse/LoadingBlack'
import { KYCSelector } from '@selector/kycSelector'
import { profileUserSelector } from '@selector/userSelector'
import { kycUser } from '@service/userService'
import { colors } from '@theme/colors'
import { fonts } from '@theme/fonts'
import React, { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Alert, Platform } from 'react-native'
import { Profile } from 'src/model/userModel'
import InputKYC from '../InputKYC'
import InputModal from '../InputModal'
import ModalGender from '../ModalGender'
import Tittle from '../Tittle'

const FormInfomation = () => {
  const theme = useTheme()
  const { t } = useTranslation()
  const dispatch = useAppDispatch()

  const kyc = useAppSelector(KYCSelector)
  const profile: Profile = useAppSelector<any>(profileUserSelector)

  const [phone, setPhone] = useState<string>('')
  const [gender, setGender] = useState<number>(1)
  const [lastname, setLastname] = useState<string>('')
  const [passport, setPassport] = useState<string>('')
  const [firstname, setFirstname] = useState<string>('')
  const [loading, setLoading] = useState<boolean>(false)
  const [checkForm, setCheckForm] = useState<boolean>(false)
  const [isShowModalGender, setShowModalGender] = useState<boolean>(false)

  const handleChangeGender = (genderChoosed: number) => {
    setGender(genderChoosed)
    setShowModalGender(false)
  }

  const handleKYCUser = async () => {
    if (firstname.trim() === '' || lastname.trim() === '' || passport.trim() === '' || phone.trim() === '') {
      return setCheckForm(true)
    }

    setLoading(true)
    let formData = new FormData()
    formData.append('userid', profile.id)
    formData.append('firstname', firstname)
    formData.append('lastname', lastname)
    formData.append('gender', gender)
    formData.append('passport', passport)
    formData.append('country', kyc.country.country)
    formData.append('phone', phone)
    formData.append('photo', { uri: Platform.OS === 'ios' ? kyc.frontCard.path.replace('file://', '') : kyc.frontCard.path, name: 'image.jpg', type: 'image/jpg' })
    formData.append('photo', { uri: Platform.OS === 'ios' ? kyc.backCard.path.replace('file://', '') : kyc.backCard.path, name: 'image.jpg', type: 'image/jpg' })
    formData.append('photo', { uri: Platform.OS === 'ios' ? kyc.selfiePhoto.path.replace('file://', '') : kyc.selfiePhoto.path, name: 'image.jpg', type: 'image/jpg' })

    const res = await kycUser(formData)
    !res.status && Alert.alert(t(res.message))
    setLoading(false)
    dispatch(checKYCUserThunk())
    res.status && goBack()
  }

  return (
    <KeyBoardSafe paddingHorizontal={15}>
      <Tittle
        t={t}
        theme={theme}
      />
      <Box marginTop={30}>
        <InputKYC
          title={t('First name')}
          value={firstname}
          onChangeText={(txt: string) => setFirstname(txt)}
          error={checkForm && firstname.trim() === ''}
          messError={t('First name is empty')}
        />
        <InputKYC
          title={t('Last name')}
          value={lastname}
          error={checkForm && lastname.trim() === ''}
          messError={t('Last name is empty')}
          onChangeText={(txt: string) => setLastname(txt)}
        />
        <InputKYC
          title={t('Phone')}
          value={phone}
          error={checkForm && phone.trim() === ''}
          messError={t('Phone is empty')}
          onChangeText={(txt: string) => setPhone(txt)}
        />
        <InputKYC
          title={t('Passport')}
          value={passport}
          error={checkForm && passport.trim() === ''}
          messError={t('Passport is empty')}
          onChangeText={(txt: string) => setPassport(txt)}
        />
        <InputModal
          title={t('Gender')}
          value={gender === 1 ? t('Male') : t('Female')}
          error={checkForm && gender === 0}
          messError={t('Please select your gender')}
          image={require('@images/trade/more.png')}
          onPress={() => setShowModalGender(true)}
        />
        <Btn
          radius={5}
          height={45}
          marginTop={20}
          disabled={loading}
          onPress={handleKYCUser}
          backgroundColor={colors.yellow}
        >
          {loading ? <LoadingBlack /> :
            <Txt fontFamily={fonts.AS}>{t('Confirm')}</Txt>
          }
        </Btn>
      </Box>
      <ModalGender
        show={isShowModalGender}
        setShow={setShowModalGender}
        onChangeGender={handleChangeGender}
      />
    </KeyBoardSafe>
  )
}

export default FormInfomation