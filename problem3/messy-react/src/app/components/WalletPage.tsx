import { useMemo } from "react";

// interface WalletBalance {
//   currency: string;
//   amount: number;
// }

interface WalletBalance {
  currency: string;
  amount: number;
  blockchain: string;
}

// interface FormattedWalletBalance {
//   currency: string;
//   amount: number;
//   formatted: string;
// }

interface FormattedWalletBalance extends WalletBalance {
  formatted: string;
}

// Explanation: FormattedWalletBallance is just different from WalletBalance with 'formatted' property.
// Therefore I let it extends WalletBalance interface

// interface Props extends BoxProps {

// }

interface Props {
  children?: React.ReactNode;
}

// Explanation: There was no BoxProps interface for Props to extends, but I think we can define Props interface directly

const useWalletBalances = (params?: any): WalletBalance[] => {
  return [
    {
      currency: "USD",
      amount: 100,
      blockchain: "Ethereum",
    },
  ];
};

const usePrices = (): Record<string, number> => {
  return {
    USD: 1,
  };
};

// Explanation: It also didn't have useWalletBallance() and usePrices() so I created these two
// The useWalletBallance() could take any params, but I have set it to return a WalletBalance array with sample data
// The usePrices() will return a object with type Record<string, number> which has property keys are string and property values are number
// As the way I thought, we will utilized usePrices() to get the prices of the relevant currencies

const WalletPage: React.FC<Props> = (props: Props) => {
  const { children, ...rest } = props;
  const balances = useWalletBalances();
  const prices = usePrices();

  const getPriority = (blockchain: any): number => {
    switch (blockchain) {
      case "Osmosis":
        return 100;
      case "Ethereum":
        return 50;
      case "Arbitrum":
        return 30;
      case "Zilliqa":
        return 20;
      case "Neo":
        return 20;
      default:
        return -99;
    }
  };

  //   const sortedBalances = useMemo(() => {
  //     return balances.filter((balance: WalletBalance) => {
  // 		  const balancePriority = getPriority(balance.blockchain);
  // 		  if (lhsPriority > -99) {
  // 		     if (balance.amount <= 0) {
  // 		       return true;
  // 		     }
  // 		  }
  // 		  return false
  // 		}).sort((lhs: WalletBalance, rhs: WalletBalance) => {
  // 			const leftPriority = getPriority(lhs.blockchain);
  // 		  const rightPriority = getPriority(rhs.blockchain);
  // 		  if (leftPriority > rightPriority) {
  // 		    return -1;
  // 		  } else if (rightPriority > leftPriority) {
  // 		    return 1;
  // 		  }
  //     });
  //   }, [balances, prices]);

  const sortedBalances = useMemo(() => {
    return balances
      .filter((balance: WalletBalance) => {
        const balancePriority = getPriority(balance.blockchain);
        return balancePriority > -99 && balance.amount <= 0;
      })
      .sort((lhs: WalletBalance, rhs: WalletBalance) => {
        const leftPriority = getPriority(lhs.blockchain);
        const rightPriority = getPriority(rhs.blockchain);
        return leftPriority - rightPriority;
      });
  }, [balances]);

  // Explanation: Instead of using lhsPriority > -99 which will cause error, we should use the returned value of getPriority(balance.blockchain)
  // to set the conditional statement of filter function
  // After filter 'balances' we will sort, in this case we want to use the numeric sort, therefore it had two params are lhs & rhs for the compare function
  // I also changed the dependency array of useMemo() since we only used balances

  const formattedBalances = sortedBalances.map((balance: WalletBalance) => {
    return {
      ...balance,
      formatted: balance.amount.toFixed(),
    };
  });

  //   const rows = sortedBalances.map((balance: FormattedWalletBalance, index: number) => {
  //     const usdValue = prices[balance.currency] * balance.amount;
  //     return (
  //       <WalletRow
  //         className={classes.row}
  //         key={index}
  //         amount={balance.amount}
  //         usdValue={usdValue}
  //         formattedAmount={balance.formatted}
  //       />
  //     )
  //   })

  //   return (
  //     <div {...rest}>
  //       {rows}
  //     </div>
  //   )
  // }

  const rows = formattedBalances.map((balance: FormattedWalletBalance, index: number) => {
    const usdValue = prices[balance.currency] * balance.amount;
    return (
      <WalletRow
        key={index}
        amount={balance.amount}
        usdValue={usdValue}
        formattedAmount={balance.formatted}
      />
    );
  });

  // Explanation: The sortedBalances array was WalletBallance[] but now we need the formatted one so I have changed it to formattedBalances array
  // It also didn't have the WalletRow component so I have created one and also its props.

  return <div {...rest}>{rows}</div>;
};

interface WalletRowProps {
  amount: number;
  usdValue: number;
  formattedAmount: string;
}

const WalletRow = (props: WalletRowProps) => {
  const { amount, usdValue, formattedAmount } = props;
  return (
    <div>
      Row with amount: {formattedAmount} (USD: {usdValue})
    </div>
  );
};
