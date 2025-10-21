import {world, system, EquipmentSlot, ItemStack, EntityEquippableComponent} from "@minecraft/server";

system.runInterval( () =>{
  for(let p of world.getPlayers()){
    let equip = p.getComponent(EntityEquippableComponent.componentId);
    let hand = equip.getEquipment(EquipmentSlot.Mainhand);
    let timestop = ["ha4:time_stop"]

    let inv = p.getComponent("inventory").container;

//this is for user interaction
    p.removeTag("timestop")
    for(let slot = 0; slot < inv.size; slot++){
      let item = inv.getItem(slot);
      if(item){
        let lore = item.getLore()[0];
        for(let types of timestop){
          if(item.typeId.includes(`${types}`)){
            if(!lore){
              if(!item.typeId.includes("stone")){
                p.addTag("timestop")
                item.setLore([`§fhold to stop the time`])
                inv.setItem(slot, item)
              }
            }
          }
        }
      }
    }

//this is the source of stop time code
    if(hand && timestop.some(type => hand.typeId.includes(type))){
        p.runCommandAsync(`gamerule commandblockoutput false`);
        p.runCommandAsync(`gamerule sendcommandfeedback false`);
        p.runCommandAsync(`gamerule dodaylightcycle false`);
        p.runCommandAsync(`tag @s add time_stop`);
        p.runCommandAsync(`execute as @e[rm=1, type=!ha4:quantum_bomb] at @s run tp @s ~~~`);
    }
      else{
        p.runCommandAsync(`gamerule dodaylightcycle true`);
      }



  } 
});

