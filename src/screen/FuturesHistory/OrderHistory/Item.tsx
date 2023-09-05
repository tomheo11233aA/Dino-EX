import Box from '@commom/Box';
import Txt from '@commom/Txt';
import { colors } from '@theme/colors';
import { fonts } from '@theme/fonts';
import React from 'react';

interface Props {
  t: any;
  item: any;
  theme: any;
}

const Item = ({ item, theme, t }: Props) => {
  const color = item.side === 'Buy' ? colors.green2 : colors.red3

  return (
    <Box
      paddingVertical={15}
      borderBottomWidth={1}
      borderColor={theme.gray2}
    >
      <Box row justifySpaceBetween>
        <Box>
          <Txt color={theme.black} fontFamily={fonts.AS} size={16}>
            {item.symbol} {t('Perpetual')}
          </Txt>
          <Txt color={color} fontFamily={fonts.AS}>
            {item.side} / {item.type}
          </Txt>
        </Box>

        <Box alignEnd>
          <Txt color={colors.grayBlue} fontFamily={fonts.M24} size={15}>
            {item.date}
          </Txt>
          <Box
            marginTop={5}
            paddingVertical={3}
            paddingHorizontal={5}
            backgroundColor={theme.green}
          >
            <Txt color={colors.green} size={13}>
              Matched
            </Txt>
          </Box>
        </Box>
      </Box>

      <Box
        row
        alignCenter
        marginTop={10}
        justifySpaceBetween
      >
        <Txt color={theme.black}>
          {'Amount (BTC)'}
        </Txt>
        <Txt color={theme.black} fontFamily={fonts.M23} size={16}>
          0,001
          <Txt color={colors.grayBlue} size={15}>
            {' / 0,0'}
          </Txt>
        </Txt>
      </Box>

      <Box
        row
        alignCenter
        marginTop={10}
        justifySpaceBetween
      >
        <Txt color={theme.black}>
          {'Price'}
        </Txt>
        <Txt color={theme.black} fontFamily={fonts.M23} size={16}>
          {item.price}
          <Txt color={colors.grayBlue} size={15}>
            {' / 0,001'}
          </Txt>
        </Txt>
      </Box>

      <Box
        row
        alignCenter
        marginTop={10}
        justifySpaceBetween
      >
        <Txt color={theme.black}>
          {'Reduce Only'}
        </Txt>

        <Txt color={theme.black} size={15}>
          {' Correct'}
        </Txt>
      </Box>
    </Box>
  )
}

export default Item