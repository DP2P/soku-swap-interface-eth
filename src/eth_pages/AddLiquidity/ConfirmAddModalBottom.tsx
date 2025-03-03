import { Currency, CurrencyAmount, Fraction, Percent } from '@sushiswap/sdk'
import React from 'react'
import { Text } from 'rebass'
import { ButtonPrimary, ButtonLight } from '../../eth_components/ButtonLegacy'
import CurrencyLogo from '../../eth_components/CurrencyLogo'
import { RowBetween, RowFixed } from '../../eth_components/Row'
import { useActiveWeb3React } from '../../eth_hooks'
import { Field } from '../../eth_state/mint/actions'
import { TYPE } from '../../theme'

export function ConfirmAddModalBottom({
    noLiquidity,
    price,
    currencies,
    parsedAmounts,
    poolTokenPercentage,
    onAdd
}: {
    noLiquidity?: boolean
    price?: Fraction
    currencies: { [field in Field]?: Currency }
    parsedAmounts: { [field in Field]?: CurrencyAmount }
    poolTokenPercentage?: Percent
    onAdd: () => void
}) {
    const { chainId } = useActiveWeb3React()
    return (
        <>
            <RowBetween>
                <TYPE.body>{currencies[Field.CURRENCY_A]?.getSymbol(chainId)} Deposited</TYPE.body>
                <RowFixed>
                    <CurrencyLogo currency={currencies[Field.CURRENCY_A]} style={{ marginRight: '8px' }} />
                    <TYPE.body>{parsedAmounts[Field.CURRENCY_A]?.toSignificant(6)}</TYPE.body>
                </RowFixed>
            </RowBetween>
            <RowBetween>
                <TYPE.body>{currencies[Field.CURRENCY_B]?.getSymbol(chainId)} Deposited</TYPE.body>
                <RowFixed>
                    <CurrencyLogo currency={currencies[Field.CURRENCY_B]} style={{ marginRight: '8px' }} />
                    <TYPE.body>{parsedAmounts[Field.CURRENCY_B]?.toSignificant(6)}</TYPE.body>
                </RowFixed>
            </RowBetween>
            <RowBetween>
                <TYPE.body>Rates</TYPE.body>
                <TYPE.body>
                    {`1 ${currencies[Field.CURRENCY_A]?.getSymbol(chainId)} = ${price?.toSignificant(4)} ${currencies[
                        Field.CURRENCY_B
                    ]?.getSymbol(chainId)}`}
                </TYPE.body>
            </RowBetween>
            <RowBetween style={{ justifyContent: 'flex-end' }}>
                <TYPE.body>
                    {`1 ${currencies[Field.CURRENCY_B]?.getSymbol(chainId)} = ${price
                        ?.invert()
                        .toSignificant(4)} ${currencies[Field.CURRENCY_A]?.getSymbol(chainId)}`}
                </TYPE.body>
            </RowBetween>
            <RowBetween>
                <TYPE.body>Share of Pool:</TYPE.body>
                <TYPE.body>{noLiquidity ? '100' : poolTokenPercentage?.toSignificant(4)}%</TYPE.body>
            </RowBetween>
            <ButtonLight style={{ margin: '20px 0 0 0' }} onClick={onAdd}>
                <Text fontWeight={500} fontSize={20}>
                    {noLiquidity ? 'Create Pool & Supply' : 'Confirm Supply'}
                </Text>
            </ButtonLight>
        </>
    )
}
