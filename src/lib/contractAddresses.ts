export const contractAddresses = {
  Identity1: "0x52644f6d5AEFaB1567D33b13C809D6Eb6cc3E0dB",
  Identity2: "0x8FA7520731649B6838c4dB3561f2dFbedd2d006f",
  Factory: "",
} as const;

export type ContractAddressKey = keyof typeof contractAddresses;
