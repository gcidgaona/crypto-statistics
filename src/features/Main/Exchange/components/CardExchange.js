import { Button, Card, InputWrapper, Stack, Text, NumberInput, Select, Group, Avatar, SimpleGrid, Tooltip } from '@mantine/core'
import { popularCryptoCurrencies, mapNameCrypto } from '../../../../constants/cryptocurrencies'
import React, { useState, useEffect, forwardRef, useMemo, useCallback } from 'react'
import { getPriceToExchange } from '../../../../services';
import toast from 'react-hot-toast';
import { formatCrypto } from '../../../../helpers/numbers';
import { InfoCircle } from 'tabler-icons-react';
import { EXCHANGE_FAIL_MESSAGE, EXCHANGE_INFO } from '../../../../constants/strings'

export const CardExchange = () => {
  const [amountToSend, setAmountToSend] = useState(0)
  const [amountToReceive, setAmountToReceive] = useState(0)
  const [sendCurrency, setSendCurrency] = useState('btc')
  const [receiveCurrency, setReceiveCurrency] = useState('')
  const [exchangeValue, setExchangeValue] = useState(0)
  const [needReCalc, setNeedReCalc] = useState(false)

  const urlBaseImage = 'https://cdn.jsdelivr.net/gh/atomiclabs/cryptocurrency-icons@bea1a9722a8c63169dcc06e86182bf2c55a76bbc/32/color'

  const dataSelect = popularCryptoCurrencies.map(crypto => ({value: crypto, label: crypto.toUpperCase(), image: `${urlBaseImage}/${crypto}.png`}))
  const urlFrom = useMemo(() => `${urlBaseImage}/${sendCurrency}.png`, [sendCurrency])
  const urlTo = useMemo(() => `${urlBaseImage}/${receiveCurrency}.png`, [receiveCurrency])

  const setManualSendCurrency = (value) => {
    setSendCurrency(value)
  }
  const setManualReceiveCurrency = (value) => {
    setReceiveCurrency(value)
  }

  const setManualExchangeValue = (value) => {
    let getValue = value[0]
    setExchangeValue(getValue)
    setNeedReCalc(old => !old)
  }
  const getPricesToExchange = (from, to) => {
    getPriceToExchange(mapNameCrypto[from], to)
      .then(result => {
        let getValues = Object.values(result[mapNameCrypto[sendCurrency]])
        if(getValues.length){
          setManualExchangeValue(getValues)
        }else{
          toast.error(EXCHANGE_FAIL_MESSAGE, {
            duration: 2000,
            style: {
              borderRadius: '10px',
              background: '#333',
              color: '#fff',
            },
          })
          setManualExchangeValue(0)
        }
      })
  }

  const getCalcReceiveValue = useCallback(() => {
    let getCalc = amountToSend * exchangeValue
    setAmountToReceive(getCalc)
  }, [amountToSend, exchangeValue])

  const setManualAmountToSend = (e) => {
    if(!isNaN(e)) return setAmountToSend(e)
    return setAmountToSend(0)
  }

  useEffect(() => {
    getCalcReceiveValue()
  }, [needReCalc, getCalcReceiveValue])

  const calculateExchange = () => {
    const defaultReceiveCurrency = receiveCurrency || '-'
    return (
      <Text className='uppercase'>
        {formatCrypto(amountToSend)} {sendCurrency} = {formatCrypto(amountToReceive)} { defaultReceiveCurrency }
      </Text>
    )
  }
  const SelectItem = forwardRef((props, ref) => {
    const { image, label, ...others } = props
    return (
        <div ref={ref} {...others}>
          <Group noWrap>
            <Avatar size="sm" src={image} />
            <div>
              <Text size="sm">{label}</Text>
            </div>
          </Group>
        </div>
    );
  })

  return (
    <Card radius="lg" className='h-96' style={{ background: '#16161e' }} >
      <Card.Section style={{ background: '#16161e' }} className="py-5 px-5">
        <Stack justify="space-between" spacing="xl">
          <div className='flex flex-row gap-2'>
            <Text style={{ fontSize: 25, fontWeight: 'bold', color: 'white' }}>
              Exchange
            </Text>
            <Tooltip
                label={EXCHANGE_INFO}
                withArrow
                position="bottom-end"
                color="blue"
                className='flex items-center mt-1.5 text-blue-400'
              >
                <InfoCircle size={22}/>
            </Tooltip>
          </div>
          <Stack spacing={12}>
            <InputWrapper label="Amount">
              <NumberInput
                defaultValue={0}
                min={0}
                hideControls
                onChange={(e) => setManualAmountToSend(e)}
                parser={(value) => value.replace(/\$\s?|(,*)/g, '')}
                formatter={(value) =>
                  !Number.isNaN(parseFloat(value))
                    ? `$ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')
                    : '$ '
                }
              />
            </InputWrapper>
            <SimpleGrid cols={2} spacing="sm">
              <InputWrapper label="From">
              <Select       
                itemComponent={SelectItem}
                value={sendCurrency}
                icon={
                  sendCurrency && <Avatar size="xs" src={urlFrom} />
                }
                onChange={setManualSendCurrency}
                data={dataSelect} />
              </InputWrapper>
              <InputWrapper label="To">
              <Select 
                itemComponent={SelectItem}
                icon={
                  receiveCurrency && <Avatar size="xs" src={urlTo} />
                }
                onChange={setManualReceiveCurrency}
                data={dataSelect} />
              </InputWrapper>
            </SimpleGrid>
          </Stack>
          <div>
            {calculateExchange()}
          </div>
          <div>
            <Button radius={10} disabled={!sendCurrency || !receiveCurrency || amountToSend === 0} className='bg-primary' onClick={() => getPricesToExchange(sendCurrency, receiveCurrency)} fullWidth styles={() => ({
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
