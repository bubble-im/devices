/**
 * @generated
 *
 * This Device SDK is provided by the device manufacturer.
 * It serves as a driver-level interface that exposes
 * the device capabilities to application developers.
 *
 * DO NOT MODIFY THIS FILE.
 * Any changes to this file may break the device contract
 * and result in runtime errors or undefined behavior.
 */

/**
 * RPC envelope (transport-agnostic)
 */
export type DeviceRpc<M extends string = string, P = any> = {
  method: M;
  params: P;
};

/**
 * PixelMug method -> params mapping (contract)
 *
 * Notes:
 * - Methods with `Record<string, never>` require NO params (call with `{}`).
 * - Remote contents are typically represented as `{ size, type, url }`.
 */
export type PixelMugMethodParams = {

  talPrintWithRemoteFont: {
    text: string;
    fontContent: { size: number; type: string; url: string };
    speed: number;
    direction: number;
  };

  talGetCupTemperature: Record<string, never>; // no params

  talPlayGif: {
    gifContent: { size: number; type: string; url: string };
  };

  talSetDisplayOnOff: { onoff: boolean };

  talSetBrightness: { percent: number };

  talRebootDevice: Record<string, never>; // no params
  talGetBrightness: Record<string, never>; // no params
  talReturn2Home: Record<string, never>; // no params
  talGetBatteryLevel: Record<string, never>; // no params
  talGetSwitch: Record<string, never>; // no params
  talGetWifiInfo: Record<string, never>; // no params

  talSetHomeSwipeEnable: { isSwipe: boolean };
};

export type PixelMugMethods = keyof PixelMugMethodParams;

/**
 * PixelMug notify/event -> params mapping (contract)
 *
 * This represents device-to-bot notifications (report frames).
 */
export type PixelMugNotifyParams = {
  CurChargingState: { value: boolean };
};

export type PixelMugNotifies = keyof PixelMugNotifyParams;

/**
 * Discriminated union of parsed notify items.
 */
export type PixelMugParsedNofity = {
  [K in PixelMugNotifies]: { name: K; params: PixelMugNotifyParams[K] };
}[PixelMugNotifies];

/**
 * PixelMug RPC request builder (NO transport / NO real RPC execution here)
 *
 * Usage:
 *   const mug = new PixelMug("office");
 */
class PixelMug {
  constructor(aliasName = "") {
    this.deviceAliasName = aliasName;
  }

  // ================= Device basic info =================
  public readonly talId = "PixelMug"; 
  /** Device alias name (logical identifier used by bot/business layer). */
  public deviceAliasName: string;

  /** Device bind index (1-based by default). */
  public bindingIndex: number = 1;

  public setBindingIndex(index: number) {
    this.bindingIndex = index;
  }

  // ================= RPC request builder =================
  /**
   * Build a transport-agnostic RPC request object for bot.setDevMessage(...)
   *
   * Developers can use:
   *   - rpc.call(method, params)  (dynamic, fully typed)
   *   - rpc.talXXX(params)        (typed sugar)
   */
  public readonly rpc = {
    /**
     * Dynamic entry: method + params -> RPC object
     * Fully type-safe: method is restricted to PixelMugMethods
     */
    call: <M extends PixelMugMethods>(
      method: M,
      params: PixelMugMethodParams[M]
    ): DeviceRpc<M, PixelMugMethodParams[M]> => {
      return {
        method,
        params,
      };
    },

    /**
     * Typed sugar APIs
     */

    talPrintWithRemoteFont: (
      params: PixelMugMethodParams["talPrintWithRemoteFont"]
    ) => this.rpc.call("talPrintWithRemoteFont", params),

    talGetCupTemperature: () => this.rpc.call("talGetCupTemperature", {}),

    talPlayGif: (params: PixelMugMethodParams["talPlayGif"]) =>
      this.rpc.call("talPlayGif", params),

    talSetDisplayOnOff: (params: PixelMugMethodParams["talSetDisplayOnOff"]) =>
      this.rpc.call("talSetDisplayOnOff", params),

    talSetBrightness: (params: PixelMugMethodParams["talSetBrightness"]) =>
      this.rpc.call("talSetBrightness", params),

    talRebootDevice: () => this.rpc.call("talRebootDevice", {}),

    talGetBrightness: () => this.rpc.call("talGetBrightness", {}),

    talReturn2Home: () => this.rpc.call("talReturn2Home", {}),

    talGetBatteryLevel: () => this.rpc.call("talGetBatteryLevel", {}),

    talGetSwitch: () => this.rpc.call("talGetSwitch", {}),

    talGetWifiInfo: () => this.rpc.call("talGetWifiInfo", {}),

    talSetHomeSwipeEnable: (
      params: PixelMugMethodParams["talSetHomeSwipeEnable"]
    ) => this.rpc.call("talSetHomeSwipeEnable", params),
  } as const;

  /**
   * Parse device notifications into a typed union list.
   *
   * Input typically comes from a report frame:
   *   [{ method: string, params: any }, ...]
   */
  public parseNotify(
    notify: Array<{ method: string; params: any }>
  ): PixelMugParsedNofity[] {
    const out: PixelMugParsedNofity[] = [];

    for (const item of notify ?? []) {
      switch (item.method) {
        case "CurChargingState":
          out.push({
            name: "CurChargingState",
            params: item.params as PixelMugNotifyParams["CurChargingState"],
          });
          break;

        default:
          break;
      }
    }

    return out;
  }
}

export default PixelMug;
