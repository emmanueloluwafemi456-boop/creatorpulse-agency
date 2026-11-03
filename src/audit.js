export function getRecommendations(a) {
 const items = [];
 if(a.branding !== 'Yes') items.push({title:'Build a recognizable first impression',text:'Start with a consistent profile image, banner, and readable channel panels. Keep your colors and typography aligned across each touchpoint.'});
 if(a.frequency === 'Occasionally') items.push({title:'Choose a rhythm you can sustain',text:'Try a realistic recurring stream slot and publish a clear schedule. Consistency can help interested viewers know when to return.'});
 if(a.challenge === 'Discoverability') items.push({title:'Make your content easier to find',text:`Use specific titles and relevant tags for ${a.category}. Write a concise bio that tells new visitors what to expect.`});
 if(a.challenge === 'Engagement') items.push({title:'Give viewers a way into the conversation',text:'Plan a welcoming opening, repeatable chat prompts, and a community ritual that feels natural to your content.'});
 if(a.challenge === 'Content direction') items.push({title:'Define your content pillars',text:'Choose two or three repeatable stream formats around your strengths. Review which topics invite the most meaningful interaction.'});
 if(a.challenge === 'Branding') items.push({title:'Create a small visual system',text:'Document a compact palette, two type styles, and simple layout rules before expanding into overlays and alerts.'});
 items.push({title:`Plan toward ${a.goal.toLowerCase()}`,text:'Choose one practical action for your next three streams. Review what you learn before increasing the scope of your promotion.'});
 return items;
}
