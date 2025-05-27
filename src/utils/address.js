// src/utils/address.ts
import { fromBech32 } from "@cosmjs/encoding";

/**
 * A shorthand if you just want to check overall Bech32 syntax,
 * without caring about prefix.
 */
export function isValidBech32(address) {
  try {
    fromBech32(address);
    return true;
  } catch {
    return false;
  }
}
