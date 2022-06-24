import { ActionIcon, Button, Card, InputWrapper, Popover, Stack, Text, NumberInput } from '@mantine/core'
import { ChevronDown } from 'tabler-icons-react';
import React, { useState, useEffect } from 'react'
import { getPriceToExchange } from '../../../../api';


const popularCryptoCurrencies = ['btc', 'eth', 'bch', 'usdt', 'trx', 'ltc', 'sol', 'usdc']
const mapNameCrypto = {
  'btc': 'bitcoin', 
  'eth': 'ethereum', 
  'bch': 'bitcoin-cash', 
  'usdt': 'tether', 
  'trx': 'tron',
  'ltc': 'litecoin',
  'sol': 'solana',
  'usdc': 'usd-coin',
}

const SelectCurrency = ({ setRefPop, refPop, setVisible, isVisible, setCurrency, currency, isDisabled }) => {

  return (
    <>
      <p className="uppercase">{currency}</p>
      <Popover
        opened={isVisible}
        onClose={() => setVisible(false)}
        spacing={0}
        disabled={isDisabled}
        target={
          <ActionIcon ref={setRefPop} onClick={() => setVisible((m) => !m)} variant="transparent"><ChevronDown size={16} style={{ display: 'block', opacity: 0.5 }} /></ActionIcon>}
        width={100}
        position="bottom"
        placement='end'
        withArrow
      >
        <div style={{paddingTop: 5, paddingBottom: 5}}>
          {
            popularCryptoCurrencies.map(crypto => (
              <Stack key={crypto} justify="space-around">
                <Text className="uppercase option-select-currency"  onClick={() => setCurrency(crypto)}>{crypto}</Text>
                </Stack>
            ))
          }
        </div>
      </Popover>
    </>
  )
}


export const CardExchange = () => {
  const [referenceElement, setReferenceElement] = useState(null);
  const [visible, setVisible] = useState(false);
  const [amountToSend, setAmountToSend] = useState(0)
  const [amountToReceive, setAmountToReceive] = useState(0)
  const [referenceElementReceive, setReferenceElementReceive] = useState(null);
  const [visibleReceive, setVisibleReceive] = useState(false);
  const [sendCurrency, setSendCurrency] = useState('btc')
  const [receiveCurrency, setReceiveCurrency] = useState('')
  const [exchangeValue, setExchangeValue] = useState(0)
  const [needReCalc, setNeedReCalc] = useState(false)

  const setManualVisible = (value) => {
    setVisible(value)
  }

  const setManualVisibleReceive = (value) => {
    setVisibleReceive(value)
  }
  const setManualSendCurrency = (value) => {
    setSendCurrency(value)
  }
  const setManualReceiveCurrency = (value) => {
    setReceiveCurrency(value)
  }

  const setManualExchangeValue = (value) => {
    let getValue = Object.values(value[mapNameCrypto[sendCurrency]])[0]
    setExchangeValue(getValue);
    setNeedReCalc(old => !old)
  }
  const getPricesToExchange = (from, to) => {
    getPriceToExchange(mapNameCrypto[from], to).then(result => setManualExchangeValue(result))
  }

  const getCalcReceiveValue = () => {
    let getCalc = amountToSend * exchangeValue
    setAmountToReceive(getCalc)
  }

  useEffect(() => {
    getCalcReceiveValue()
  }, [needReCalc])
  
  const calculateExchange = () => {
    const defaultReceiveCurrency = receiveCurrency || '-'
    return (
      <Text className='uppercase'>
        {amountToSend} {sendCurrency} = {exchangeValue} { defaultReceiveCurrency }
      </Text>
    )
  }

  return (
    <Card radius="lg">
      <Card.Section style={{ background: '#16161e', paddingLeft: 30, paddingRight: 20, paddingTop: 20, paddingBottom: 20, height: 350 }}>
        <Stack justify="space-between" spacing="xl">
          <div>
            <Text style={{ fontSize: 25, fontWeight: 'bold', color: 'white' }}>Exchange</Text>
          </div>
          <Stack spacing={12}>
            <InputWrapper label="You send">
              <NumberInput
                defaultValue={0}
                rightSectionWidth={70}
                onChange={(e) => setAmountToSend(e)}
                rightSection={<SelectCurrency isDisabled={false} style={{ zIndex: 9999 }} currency={sendCurrency} setRefPop={setReferenceElement} refPop={referenceElement} setVisible={setManualVisible} isVisible={visible} setCurrency={setManualSendCurrency} />}
                parser={(value) => value.replace(/\$\s?|(,*)/g, '')}
                formatter={(value) =>
                  !Number.isNaN(parseFloat(value))
                    ? `$ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')
                    : '$ '
                }
              />
            </InputWrapper>
            <InputWrapper label="You receive">
            <NumberInput
                placeholder="Amount Crypto"
                defaultValue={0}
                rightSectionWidth={70}
                value={amountToReceive}
                disabled
                rightSection={<SelectCurrency isDisabled={!sendCurrency} style={{ zIndex: 9999 }} currency={receiveCurrency} setRefPop={setReferenceElementReceive} refPop={referenceElementReceive} setVisible={setManualVisibleReceive} isVisible={visibleReceive} setCurrency={setManualReceiveCurrency} />}
                parser={(value) => value.replace(/\$\s?|(,*)/g, '')}
                formatter={(value) =>
                  !Number.isNaN(parseFloat(value))
                    ? `$ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')
                    : '$ '
                }
              />
            </InputWrapper>
          </Stack>
          <div>
            {calculateExchange()}
          </div>
          <div>
            <Button radius={10} disabled={!sendCurrency || !receiveCurrency} onClick={() => getPricesToExchange(sendCurrency, receiveCurrency)} fullWidth styles={() => ({
              root: {
                height: 50,
                background: '#00dd80',
                color: '#0d0f11',
                '&:hover': {
                  backgroundColor: '#04c976',
                },
              }
            })}>
              Exchange
            </Button>
          </div>
        </Stack>
      </Card.Section>
    </Card>
  )
}
