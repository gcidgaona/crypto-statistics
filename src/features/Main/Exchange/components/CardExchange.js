import { ActionIcon, Button, Card, InputWrapper, Popover, Stack, Text, NumberInput, Select, Group, Avatar, SimpleGrid } from '@mantine/core'
import { ChevronDown } from 'tabler-icons-react';
import { popularCryptoCurrencies, mapNameCrypto } from '../../../../constants/cryptocurrencies'
import React, { useState, useEffect, forwardRef, useMemo } from 'react'
import { getPriceToExchange } from '../../../../api';
import toast from 'react-hot-toast';

export const CardExchange = () => {
  const [amountToSend, setAmountToSend] = useState(0)
  const [amountToReceive, setAmountToReceive] = useState(0)
  const [sendCurrency, setSendCurrency] = useState('btc')
  const [receiveCurrency, setReceiveCurrency] = useState('')
  const [exchangeValue, setExchangeValue] = useState(0)
  const [needReCalc, setNeedReCalc] = useState(false)

  const dataSelect = popularCryptoCurrencies.map(crypto => ({value: crypto, label: crypto.toUpperCase(), image: `https://cdn.jsdelivr.net/gh/atomiclabs/cryptocurrency-icons@bea1a9722a8c63169dcc06e86182bf2c55a76bbc/32/color/${crypto}.png`}))

  const setManualSendCurrency = (value) => {
    setSendCurrency(value)
  }
  const setManualReceiveCurrency = (value) => {
    setReceiveCurrency(value)
  }

  const setManualExchangeValue = (value) => {
    let getValue = value[0]
    setExchangeValue(getValue);
    setNeedReCalc(old => !old)
  }
  const getPricesToExchange = (from, to) => {
    getPriceToExchange(mapNameCrypto[from], to)
      .then(result => {
        let values = Object.values(result[mapNameCrypto[sendCurrency]])
        if(values.length){
          setManualExchangeValue(values)
        }else{
          toast.error('We dont have exchange for this pair.', {
            duration: 2000,
            style: {
              borderRadius: '10px',
              background: '#333',
              color: '#fff',
            },
          })
        }
      })
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

  const urlBaseImage = 'https://cdn.jsdelivr.net/gh/atomiclabs/cryptocurrency-icons@bea1a9722a8c63169dcc06e86182bf2c55a76bbc/32/color'
  const urlFrom = useMemo(() => `${urlBaseImage}/${sendCurrency}.png`, [sendCurrency])
  const urlTo = useMemo(() => `${urlBaseImage}/${receiveCurrency}.png`, [receiveCurrency])

  return (
    <Card radius="lg" className='h-96' style={{ background: '#16161e' }} >
      <Card.Section style={{ background: '#16161e' }} className="py-5 px-5">
        <Stack justify="space-between" spacing="xl">
          <div>
            <Text style={{ fontSize: 25, fontWeight: 'bold', color: 'white' }}>Exchange</Text>
          </div>
          <Stack spacing={12}>
            <InputWrapper label="Amount">
              <NumberInput
                defaultValue={0}
                min={0}
                onChange={(e) => setAmountToSend(e)}
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
                  <Avatar size="xs" src={urlFrom} />
                }
                onChange={setManualSendCurrency}
                data={dataSelect} />
              </InputWrapper>
              <InputWrapper label="To">
              <Select 
                itemComponent={SelectItem}
                icon={
                  <Avatar size="xs" src={urlTo} />
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
