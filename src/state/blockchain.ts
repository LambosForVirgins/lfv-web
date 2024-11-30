import { useEffect } from "react";
import { atom, useRecoilState } from "recoil";
import { v4 as generateRandom } from "uuid";

interface Blockchain {
  blockNumber: number;
  blockHash: string;
}

export const blockchainAtom = atom<Blockchain>({
  key: "blockchain-atom",
  default: {
    blockNumber: 1,
    blockHash: generateRandom().substring(0, 8),
  },
});

export const useBlockSimulation = ({
  blockTime = 500,
}: {
  blockTime: number;
}) => {
  const [block, setBlock] = useRecoilState(blockchainAtom);

  useEffect(() => {
    const blockSimulation = setInterval(() => {
      setBlock((prev) => ({
        blockNumber: prev.blockNumber + 1,
        blockHash: generateRandom().substring(0, 8),
      }));
    }, blockTime);

    return () => {
      clearInterval(blockSimulation);
    };
  }, []);

  return block;
};
