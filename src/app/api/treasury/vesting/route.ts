import { DrawDB } from "@/src/utils/gaming/DrawDB";
import { NextRequest, NextResponse } from "next/server";

type VestingAccount = {
  contractId?: string;
  wallet: string;
  seed: string;
};

export type AccountCollection = Record<string, VestingAccount[]>;

const accounts: AccountCollection = {
  "5V6gdbG8ZDdCVuHvN1Q5spDDtXapPj7UezZxiAoQY4wG": [
    {
      contractId: "4iTqCLasn1JZbM2mWbjwdz6YGJKNPPYNiox2hP1GhjG2",
      wallet: "r2Vvks2HWS1BF3bcKduR36mL3Z8zbzevQTeK2LcSbb3",
      seed: "7269498144651793032350653303779603648438231491724953486764497278",
    },
    {
      contractId: "4ajRn5tgXJzAtraoZVAsTxpum2y8Lku54k68jo9t1Uea",
      wallet: "4DM2vhhkpuimLTtXKFbCHoFXiszcu27B6Hn3hNsuqqx3",
      seed: "5737260841270684873565612993677261090156600349666251053598097260",
    },
    {
      contractId: "4SwWz1SjtkHLyi6KgsHBL7CTvWjhJvhQbTJGupcoW2X5",
      wallet: "6Rg8oB6hHbr1yHcWsU55ULKtn1LgT2CQaLws6V7pXfjH",
      seed: "3898237197191018766437551637980918310703582402335873803927602539",
    },
    {
      contractId: "4ae8c7spEHUeJVXxQh4Qmzbkgv3S9LiNzfJPbdpe6rjX",
      wallet: "ByohExQS9KS9E9WWcWX95yJe5sDg9vS27W8zkNHzQuFd",
      seed: "5167935613741317161574761680901754173563629498285569687207195984",
    },
  ],
  M1TsVPdju4sdtFZGmpyCk9BHRLAoPqJUHMLbRpQCstV: [
    {
      wallet: "HVY4wfsqx8iEN5rMcGn5CEX4ePp79pmMQ5ZiqzNRzyAS",
      seed: "1418390455244106101023821795325093890786176814954474963496401457",
    },
    {
      contractId: "4nTYcXd193UJ9YR3jCzByaC2Eoy13W1AseY2zrA9vNkY",
      wallet: "CecXzbU51iYFniYwWyNk82EqQJ8F9FjiTRDSgPnr4yLY",
      seed: "8866074935430607465454191553546021780026198912800465700424848601",
    },
    {
      contractId: "4SxQGq3ZzBqKqdi8BvF2Rw2v8BAfk49veJRjS8CUpz94",
      wallet: "54szvVqh2n7QBCXhtQ6KCjhcLkDZXARG8F7Jjyb7K8G3",
      seed: "3991150813971661313306263052762688481456252041981079402751882358",
    },
    {
      contractId: "4Wq1jM62PZxEJhdqiCgpbcsjzqGS16Y2U7R4VmKDwm2e",
      wallet: "BT2q8wxb5N51Q13GY9uEfgZYUmpAXgGvFEataUn85XmR",
      seed: "4717560561348620795250683535104183535936971539091926913985251497",
    },
  ],
  DdDEGsYdHCY8SwfHRHsGwriuqapkqKbao4e25LT6mRqN: [
    {
      contractId: "4nP6vqNqyP3pXJQmxnwzLhdpa6kgeqH5s7JWebV48fuQ",
      wallet: "6QQVDCSSucTQS3tSG3rw8EYbocPUubuZWrfqtbXPBP6c",
      seed: "8300993924508080429367054688502141710090147555650377656134472302",
    },
    {
      contractId: "4rFjzKiz4W9jskfAt9vkpXZdrDjyKWvJLiAsLJbHqbfT",
      wallet: "H7itb6CgNrCf75HatZWKMpzGfY7WCxawdkTvMCi7LyUU",
      seed: "9106056660238474399720543734738689023137534298105696052183812305",
    },
    {
      contractId: "4NwoMngn9wBaSKLa8T7aAsEqGCoTAFfzDUyKeroo84mc",
      wallet: "BDp3FtyEBAFM2HK7TXa5VvHfCvw9rnior5rag13Ecjg1",
      seed: "2282948280638688156893353167988790220194843801859961302120421885",
    },
    {
      contractId: "4FCX3uneMYm1AH9ZABkSJLDC94DS1HLeVMXwW1StoseN",
      wallet: "FTbL6yzadkjirdkEEPuyYrShS3NYx8efGFAxXRY9zqee",
      seed: "0676051333743874791583213156605644387243986998653280715622538255",
    },
  ],
  CqsXtmGb9PVqGBgUwGNxqsHrVxWs8XUfhSvj5nWZLwQ9: [
    {
      contractId: "4akJshDY1jPd6pXrz4wzCpUS124JX3vCiBMjMnTGP15w",
      wallet: "3HZtteYTAX1Q3ipQixkZV2L92rvd8mxcA19vfqJVqFpN",
      seed: "5829954263555635635548357477853043396671209775142572217969007586",
    },
    {
      contractId: "4WnNEuDpjKVCLn8e1M4whpiokwyUnULh2UyGNhnjupEJ",
      wallet: "4KSw8CWYtTpuy3mqwWXvxk9bJBLTqXomJ9rUwhYDV1bn",
      seed: "4431070627264764131697620722877142831117149966653844311770830923",
    },
    {
      contractId: "4rMx4B8vc58RU3NPAjM7KEWGLjiihP4b6TXBKXQ7hkww",
      wallet: "4o7Y2GU1X5zbx9MSZTerTCPmPdC99iavQatSMnPeBTWm",
      seed: "9851178814560068691630822128045011228789507265019885380814772341",
    },
    {
      contractId: "4nSf7itfe2RRT62BYCkMCedLxPBpbmd2PkzvTLYm8efx",
      wallet: "BbNoKCP7q4hEJ6CHBPoV8of4DKdd4NdG9bMX9fE4g9pT",
      seed: "8755039387408578164414932151875841770394221516137198562060309296",
    },
  ],
};

export async function GET(req: NextRequest) {
  const draw = await DrawDB.getCurrentDraw();

  if (!draw) {
    return NextResponse.json({ error: "No open draws" }, { status: 400 });
  }

  return NextResponse.json(accounts, { status: 200 });
}
