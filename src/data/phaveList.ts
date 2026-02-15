// PHaVE List - Top 150 Phrasal Verbs in English
// Based on the PHaVE (Phrasal Verbs in English) list by Dr. Norbert Schmitt
// Each verb includes meaning, example sentences, and difficulty level

export interface PhrasalVerb {
  id: string;
  verb: string;
  particle: string;
  meaning: string;
  example: string;
  example2?: string;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  category: string;
  synonyms?: string[];
}

export const phaveList: PhrasalVerb[] = [
  // Top 20 Most Frequent
  { id: '1', verb: 'come', particle: 'up with', meaning: 'To think of an idea or plan', example: 'She came up with a brilliant solution to the problem.', example2: 'Can you come up with any ideas for the party?', difficulty: 'intermediate', category: 'thinking', synonyms: ['devise', 'conceive'] },
  { id: '2', verb: 'look', particle: 'forward to', meaning: 'To anticipate with pleasure', example: 'I\'m looking forward to meeting you next week.', example2: 'We look forward to seeing you at the conference.', difficulty: 'beginner', category: 'emotions', synonyms: ['anticipate', 'await eagerly'] },
  { id: '3', verb: 'carry', particle: 'out', meaning: 'To perform or complete a task', example: 'The police are carrying out an investigation.', example2: 'We need to carry out the plan carefully.', difficulty: 'intermediate', category: 'action', synonyms: ['execute', 'perform', 'conduct'] },
  { id: '4', verb: 'set', particle: 'up', meaning: 'To establish or arrange something', example: 'They set up a new business last year.', example2: 'Let me set up the equipment for the presentation.', difficulty: 'beginner', category: 'action', synonyms: ['establish', 'arrange', 'prepare'] },
  { id: '5', verb: 'pick', particle: 'up', meaning: 'To collect someone or something; to learn casually', example: 'I\'ll pick you up at 7 PM.', example2: 'She picked up Spanish while living in Madrid.', difficulty: 'beginner', category: 'action', synonyms: ['collect', 'gather', 'acquire'] },
  { id: '6', verb: 'go', particle: 'on', meaning: 'To continue; to happen', example: 'Please go on with your story.', example2: 'What\'s going on here?', difficulty: 'beginner', category: 'action', synonyms: ['continue', 'proceed', 'occur'] },
  { id: '7', verb: 'come', particle: 'back', meaning: 'To return', example: 'Come back soon!', example2: 'The memory came back to me later.', difficulty: 'beginner', category: 'movement', synonyms: ['return', 'go back'] },
  { id: '8', verb: 'find', particle: 'out', meaning: 'To discover information', example: 'I need to find out when the train leaves.', example2: 'We found out that she was leaving.', difficulty: 'beginner', category: 'thinking', synonyms: ['discover', 'learn', 'determine'] },
  { id: '9', verb: 'come', particle: 'up', meaning: 'To be mentioned; to approach', example: 'Your name came up in conversation.', example2: 'A man came up to me on the street.', difficulty: 'intermediate', category: 'action', synonyms: ['arise', 'approach', 'appear'] },
  { id: '10', verb: 'put', particle: 'on', meaning: 'To dress in; to activate', example: 'Put on your jacket, it\'s cold.', example2: 'Can you put on the light?', difficulty: 'beginner', category: 'action', synonyms: ['wear', 'activate', 'switch on'] },
  { id: '11', verb: 'take', particle: 'off', meaning: 'To remove clothing; to depart', example: 'Please take off your shoes.', example2: 'The plane took off on time.', difficulty: 'beginner', category: 'action', synonyms: ['remove', 'depart', 'leave'] },
  { id: '12', verb: 'get', particle: 'up', meaning: 'To rise from bed', example: 'I get up at 7 AM every day.', example2: 'She got up and left the room.', difficulty: 'beginner', category: 'movement', synonyms: ['rise', 'stand up', 'awaken'] },
  { id: '13', verb: 'sit', particle: 'down', meaning: 'To take a seat', example: 'Please sit down and make yourself comfortable.', example2: 'He sat down at his desk.', difficulty: 'beginner', category: 'movement', synonyms: ['be seated', 'take a seat'] },
  { id: '14', verb: 'turn', particle: 'on', meaning: 'To activate a device', example: 'Can you turn on the TV?', example2: 'He turned on the computer.', difficulty: 'beginner', category: 'action', synonyms: ['switch on', 'activate', 'start'] },
  { id: '15', verb: 'turn', particle: 'off', meaning: 'To deactivate a device', example: 'Please turn off the lights when you leave.', example2: 'She turned off her phone.', difficulty: 'beginner', category: 'action', synonyms: ['switch off', 'deactivate', 'stop'] },
  { id: '16', verb: 'look', particle: 'up', meaning: 'To search for information', example: 'I need to look up the address online.', example2: 'She looked the word up in the dictionary.', difficulty: 'beginner', category: 'thinking', synonyms: ['search', 'find', 'research'] },
  { id: '17', verb: 'give', particle: 'up', meaning: 'To stop trying; to surrender', example: 'Don\'t give up! Keep practicing.', example2: 'He gave up smoking last year.', difficulty: 'beginner', category: 'emotions', synonyms: ['quit', 'surrender', 'abandon'] },
  { id: '18', verb: 'grow', particle: 'up', meaning: 'To mature from childhood', example: 'I grew up in a small town.', example2: 'She wants to be a doctor when she grows up.', difficulty: 'beginner', category: 'life', synonyms: ['mature', 'develop', 'age'] },
  { id: '19', verb: 'work', particle: 'out', meaning: 'To exercise; to solve', example: 'I work out at the gym three times a week.', example2: 'We need to work out this problem together.', difficulty: 'intermediate', category: 'action', synonyms: ['exercise', 'solve', 'calculate'] },
  { id: '20', verb: 'call', particle: 'back', meaning: 'To return a phone call', example: 'I\'ll call you back in five minutes.', example2: 'The manager called back with the answer.', difficulty: 'beginner', category: 'communication', synonyms: ['return a call', 'phone back'] },

  // 21-40
  { id: '21', verb: 'check', particle: 'out', meaning: 'To examine; to leave a hotel', example: 'Check out this new song!', example2: 'We need to check out of the hotel by noon.', difficulty: 'beginner', category: 'action', synonyms: ['examine', 'inspect', 'leave'] },
  { id: '22', verb: 'come', particle: 'from', meaning: 'To originate from a place', example: 'She comes from Japan.', example2: 'Where does this wine come from?', difficulty: 'beginner', category: 'origin', synonyms: ['originate', 'derive', 'be from'] },
  { id: '23', verb: 'cut', particle: 'off', meaning: 'To disconnect; to interrupt', example: 'We were cut off during the phone call.', example2: 'Please don\'t cut me off when I\'m speaking.', difficulty: 'intermediate', category: 'action', synonyms: ['disconnect', 'interrupt', 'terminate'] },
  { id: '24', verb: 'do', particle: 'away with', meaning: 'To abolish or get rid of', example: 'The company did away with the old policy.', example2: 'We should do away with these outdated rules.', difficulty: 'advanced', category: 'action', synonyms: ['abolish', 'eliminate', 'remove'] },
  { id: '25', verb: 'drop', particle: 'off', meaning: 'To deliver someone or something', example: 'I\'ll drop you off at school on my way to work.', example2: 'Can you drop off these packages at the post office?', difficulty: 'beginner', category: 'transport', synonyms: ['deliver', 'leave', 'deposit'] },
  { id: '26', verb: 'end', particle: 'up', meaning: 'To finally be in a particular place or situation', example: 'We ended up staying home because of the rain.', example2: 'How did you end up living in Paris?', difficulty: 'intermediate', category: 'result', synonyms: ['finish', 'conclude', 'wind up'] },
  { id: '27', verb: 'fall', particle: 'behind', meaning: 'To fail to keep up with others', example: 'Don\'t fall behind with your rent payments.', example2: 'He fell behind in class and had to study harder.', difficulty: 'intermediate', category: 'progress', synonyms: ['lag', 'trail', 'drop back'] },
  { id: '28', verb: 'figure', particle: 'out', meaning: 'To understand or solve something', example: 'I can\'t figure out how this works.', example2: 'We need to figure out a solution to this problem.', difficulty: 'intermediate', category: 'thinking', synonyms: ['understand', 'solve', 'work out'] },
  { id: '29', verb: 'fill', particle: 'out', meaning: 'To complete a form', example: 'Please fill out this application form.', example2: 'I need to fill out these documents for the bank.', difficulty: 'beginner', category: 'action', synonyms: ['complete', 'fill in'] },
  { id: '30', verb: 'find', particle: 'out', meaning: 'To discover information', example: 'I need to find out when the train leaves.', example2: 'We found out that she was leaving.', difficulty: 'beginner', category: 'thinking', synonyms: ['discover', 'learn', 'determine'] },
  { id: '31', verb: 'get', particle: 'along with', meaning: 'To have a good relationship', example: 'Do you get along with your colleagues?', example2: 'I get along well with my neighbors.', difficulty: 'beginner', category: 'relationships', synonyms: ['be friendly', 'cooperate'] },
  { id: '32', verb: 'get', particle: 'away with', meaning: 'To avoid punishment', example: 'He got away with cheating on the test.', example2: 'You can\'t get away with being late every day.', difficulty: 'intermediate', category: 'action', synonyms: ['escape', 'avoid consequences'] },
  { id: '33', verb: 'get', particle: 'back', meaning: 'To return; to retrieve', example: 'When did you get back from vacation?', example2: 'I need to get my book back from John.', difficulty: 'beginner', category: 'movement', synonyms: ['return', 'retrieve', 'come back'] },
  { id: '34', verb: 'get', particle: 'in', meaning: 'To enter a vehicle; to arrive', example: 'Get in the car, we\'re leaving.', example2: 'What time did you get in last night?', difficulty: 'beginner', category: 'movement', synonyms: ['enter', 'arrive'] },
  { id: '35', verb: 'get', particle: 'off', meaning: 'To exit a vehicle', example: 'I\'ll get off at the next stop.', example2: 'Get off the bus at Main Street.', difficulty: 'beginner', category: 'movement', synonyms: ['exit', 'leave', 'alight'] },
  { id: '36', verb: 'get', particle: 'on', meaning: 'To board a vehicle', example: 'Get on the train at platform 3.', example2: 'We got on the bus at the station.', difficulty: 'beginner', category: 'movement', synonyms: ['board', 'enter', 'mount'] },
  { id: '37', verb: 'get', particle: 'out', meaning: 'To exit; to leave', example: 'Get out of here!', example2: 'He got out of the car quickly.', difficulty: 'beginner', category: 'movement', synonyms: ['exit', 'leave', 'escape'] },
  { id: '38', verb: 'get', particle: 'over', meaning: 'To recover from; to overcome', example: 'She got over her illness quickly.', example2: 'You\'ll get over the disappointment.', difficulty: 'intermediate', category: 'emotions', synonyms: ['recover', 'overcome', 'bounce back'] },
  { id: '39', verb: 'get', particle: 'rid of', meaning: 'To dispose of; eliminate', example: 'We need to get rid of these old boxes.', example2: 'I can\'t get rid of this headache.', difficulty: 'intermediate', category: 'action', synonyms: ['eliminate', 'discard', 'remove'] },
  { id: '40', verb: 'get', particle: 'up', meaning: 'To rise from bed; to stand', example: 'I get up at 6 AM every morning.', example2: 'Get up from that chair!', difficulty: 'beginner', category: 'movement', synonyms: ['rise', 'stand up', 'awaken'] },

  // 41-60
  { id: '41', verb: 'give', particle: 'up', meaning: 'To stop trying; to surrender', example: 'Don\'t give up! Keep practicing.', example2: 'He gave up smoking last year.', difficulty: 'beginner', category: 'emotions', synonyms: ['quit', 'surrender', 'abandon'] },
  { id: '42', verb: 'go', particle: 'ahead', meaning: 'To proceed; to begin', example: 'Go ahead, I\'m listening.', example2: 'The project will go ahead as planned.', difficulty: 'beginner', category: 'action', synonyms: ['proceed', 'continue', 'begin'] },
  { id: '43', verb: 'go', particle: 'away', meaning: 'To leave; to disappear', example: 'Go away! I\'m busy.', example2: 'The smell will go away soon.', difficulty: 'beginner', category: 'movement', synonyms: ['leave', 'depart', 'disappear'] },
  { id: '44', verb: 'go', particle: 'back', meaning: 'To return to a place', example: 'Let\'s go back to the beginning.', example2: 'I went back to my hometown.', difficulty: 'beginner', category: 'movement', synonyms: ['return', 'revert'] },
  { id: '45', verb: 'go', particle: 'on', meaning: 'To continue; to happen', example: 'Please go on with your story.', example2: 'What\'s going on here?', difficulty: 'beginner', category: 'action', synonyms: ['continue', 'proceed', 'occur'] },
  { id: '46', verb: 'go', particle: 'out', meaning: 'To leave home; to date', example: 'We went out for dinner.', example2: 'They\'ve been going out for two years.', difficulty: 'beginner', category: 'social', synonyms: ['exit', 'date', 'socialize'] },
  { id: '47', verb: 'hand', particle: 'in', meaning: 'To submit work or documents', example: 'Please hand in your homework tomorrow.', example2: 'I handed in my resignation yesterday.', difficulty: 'intermediate', category: 'action', synonyms: ['submit', 'deliver', 'turn in'] },
  { id: '48', verb: 'hand', particle: 'out', meaning: 'To distribute to a group', example: 'The teacher handed out the worksheets.', example2: 'They were handing out free samples.', difficulty: 'intermediate', category: 'action', synonyms: ['distribute', 'give out', 'pass out'] },
  { id: '49', verb: 'hang', particle: 'on', meaning: 'To wait; to hold tightly', example: 'Hang on a minute, I\'m coming.', example2: 'Hang on to the railing!', difficulty: 'intermediate', category: 'action', synonyms: ['wait', 'hold on', 'persevere'] },
  { id: '50', verb: 'hang', particle: 'up', meaning: 'To end a phone call', example: 'She hung up on me!', example2: 'Don\'t hang up yet.', difficulty: 'intermediate', category: 'communication', synonyms: ['disconnect', 'end call'] },
  { id: '51', verb: 'hold', particle: 'on', meaning: 'To wait; to maintain grip', example: 'Hold on, I\'ll check.', example2: 'Hold on to your hat!', difficulty: 'beginner', category: 'action', synonyms: ['wait', 'hang on', 'maintain'] },
  { id: '52', verb: 'hold', particle: 'up', meaning: 'To delay; to rob', example: 'Sorry, I was held up in traffic.', example2: 'The bank was held up yesterday.', difficulty: 'intermediate', category: 'action', synonyms: ['delay', 'rob', 'hinder'] },
  { id: '53', verb: 'keep', particle: 'on', meaning: 'To continue doing something', example: 'Keep on trying, you\'ll get it.', example2: 'He kept on talking for hours.', difficulty: 'beginner', category: 'action', synonyms: ['continue', 'persist', 'maintain'] },
  { id: '54', verb: 'keep', particle: 'up with', meaning: 'To stay at the same level as', example: 'I can\'t keep up with the news anymore.', example2: 'Keep up with the class or you\'ll fall behind.', difficulty: 'intermediate', category: 'action', synonyms: ['match', 'maintain pace', 'stay current'] },
  { id: '55', verb: 'lay', particle: 'off', meaning: 'To dismiss employees', example: 'The company laid off 100 workers.', example2: 'Many people were laid off during the recession.', difficulty: 'intermediate', category: 'work', synonyms: ['dismiss', 'terminate', 'make redundant'] },
  { id: '56', verb: 'leave', particle: 'out', meaning: 'To omit or exclude', example: 'Don\'t leave me out of the game!', example2: 'You left out an important detail.', difficulty: 'intermediate', category: 'action', synonyms: ['omit', 'exclude', 'miss out'] },
  { id: '57', verb: 'let', particle: 'down', meaning: 'To disappoint someone', example: 'Don\'t let me down!', example2: 'I\'m sorry I let you down yesterday.', difficulty: 'intermediate', category: 'emotions', synonyms: ['disappoint', 'fail', 'betray'] },
  { id: '58', verb: 'lie', particle: 'down', meaning: 'To recline or rest horizontally', example: 'I need to lie down for a while.', example2: 'She lay down on the sofa and fell asleep.', difficulty: 'beginner', category: 'movement', synonyms: ['recline', 'rest', 'stretch out'] },
  { id: '59', verb: 'line', particle: 'up', meaning: 'To form a queue; to arrange', example: 'People lined up outside the store.', example2: 'We need to line up the chairs for the meeting.', difficulty: 'beginner', category: 'action', synonyms: ['queue', 'arrange', 'organize'] },
  { id: '60', verb: 'live', particle: 'up to', meaning: 'To meet expectations', example: 'The movie lived up to all the hype.', example2: 'He failed to live up to his parents\' expectations.', difficulty: 'advanced', category: 'expectations', synonyms: ['fulfill', 'meet', 'satisfy'] },

  // 61-80
  { id: '61', verb: 'log', particle: 'in/on', meaning: 'To access a computer system', example: 'I need to log in to check my email.', example2: 'Please log on to the website to continue.', difficulty: 'beginner', category: 'technology', synonyms: ['sign in', 'access', 'enter'] },
  { id: '62', verb: 'log', particle: 'out/off', meaning: 'To exit a computer system', example: 'Don\'t forget to log out when you finish.', example2: 'I logged off and went home.', difficulty: 'beginner', category: 'technology', synonyms: ['sign out', 'exit', 'leave'] },
  { id: '63', verb: 'look', particle: 'after', meaning: 'To take care of', example: 'Can you look after my cat while I\'m away?', example2: 'She looks after her elderly parents.', difficulty: 'beginner', category: 'care', synonyms: ['care for', 'take care of', 'watch'] },
  { id: '64', verb: 'look', particle: 'at', meaning: 'To direct attention to', example: 'Look at that beautiful sunset!', example2: 'The doctor looked at my X-rays.', difficulty: 'beginner', category: 'perception', synonyms: ['view', 'examine', 'observe'] },
  { id: '65', verb: 'look', particle: 'for', meaning: 'To search for', example: 'I\'m looking for my keys.', example2: 'We\'re looking for a new apartment.', difficulty: 'beginner', category: 'search', synonyms: ['search for', 'seek', 'hunt for'] },
  { id: '66', verb: 'look', particle: 'into', meaning: 'To investigate', example: 'The police are looking into the case.', example2: 'I\'ll look into the problem and get back to you.', difficulty: 'intermediate', category: 'investigation', synonyms: ['investigate', 'examine', 'research'] },
  { id: '67', verb: 'make', particle: 'up', meaning: 'To invent; to reconcile', example: 'She made up an excuse for being late.', example2: 'They made up after their argument.', difficulty: 'intermediate', category: 'creation', synonyms: ['invent', 'create', 'reconcile'] },
  { id: '68', verb: 'mix', particle: 'up', meaning: 'To confuse; to combine', example: 'I mixed up the dates and missed the meeting.', example2: 'Mix up the ingredients in a bowl.', difficulty: 'intermediate', category: 'confusion', synonyms: ['confuse', 'muddle', 'combine'] },
  { id: '69', verb: 'pass', particle: 'away', meaning: 'To die (euphemism)', example: 'Her grandmother passed away last year.', example2: 'He passed away peacefully in his sleep.', difficulty: 'intermediate', category: 'life', synonyms: ['die', 'decease', 'perish'] },
  { id: '70', verb: 'pay', particle: 'back', meaning: 'To repay money or a favor', example: 'I\'ll pay you back next week.', example2: 'He paid back the loan in six months.', difficulty: 'beginner', category: 'money', synonyms: ['repay', 'reimburse', 'return'] },
  { id: '71', verb: 'point', particle: 'out', meaning: 'To indicate or mention', example: 'She pointed out the mistake in my report.', example2: 'I\'d like to point out that we\'re running late.', difficulty: 'intermediate', category: 'communication', synonyms: ['indicate', 'mention', 'highlight'] },
  { id: '72', verb: 'pull', particle: 'over', meaning: 'To stop a vehicle at the side', example: 'The police told him to pull over.', example2: 'Pull over, I need to check the map.', difficulty: 'intermediate', category: 'driving', synonyms: ['stop', 'halt', 'park'] },
  { id: '73', verb: 'put', particle: 'away', meaning: 'To return something to its place', example: 'Put away your toys when you\'re done.', example2: 'She put away the dishes after dinner.', difficulty: 'beginner', category: 'action', synonyms: ['store', 'tidy away', 'put back'] },
  { id: '74', verb: 'put', particle: 'off', meaning: 'To postpone', example: 'Don\'t put off your homework.', example2: 'The meeting was put off until next week.', difficulty: 'intermediate', category: 'time', synonyms: ['postpone', 'delay', 'defer'] },
  { id: '75', verb: 'put', particle: 'on', meaning: 'To dress in; to activate', example: 'Put on your jacket, it\'s cold.', example2: 'Can you put on the light?', difficulty: 'beginner', category: 'action', synonyms: ['wear', 'activate', 'switch on'] },
  { id: '76', verb: 'put', particle: 'up with', meaning: 'To tolerate', example: 'I can\'t put up with this noise anymore.', example2: 'How do you put up with his behavior?', difficulty: 'intermediate', category: 'tolerance', synonyms: ['tolerate', 'endure', 'bear'] },
  { id: '77', verb: 'run', particle: 'away', meaning: 'To escape; to flee', example: 'The dog ran away from home.', example2: 'Don\'t run away from your problems.', difficulty: 'beginner', category: 'movement', synonyms: ['escape', 'flee', 'bolt'] },
  { id: '78', verb: 'run', particle: 'into', meaning: 'To meet by chance; to collide', example: 'I ran into an old friend at the store.', example2: 'The car ran into a tree.', difficulty: 'intermediate', category: 'chance', synonyms: ['encounter', 'meet', 'collide with'] },
  { id: '79', verb: 'run', particle: 'out of', meaning: 'To deplete supplies', example: 'We\'re running out of milk.', example2: 'I ran out of time before finishing.', difficulty: 'intermediate', category: 'resources', synonyms: ['deplete', 'exhaust', 'use up'] },
  { id: '80', verb: 'set', particle: 'up', meaning: 'To establish or arrange', example: 'They set up a new business.', example2: 'Let me set up the equipment.', difficulty: 'beginner', category: 'action', synonyms: ['establish', 'arrange', 'prepare'] },

  // 81-100
  { id: '81', verb: 'show', particle: 'up', meaning: 'To arrive or appear', example: 'He didn\'t show up for work today.', example2: 'The stain showed up on the white shirt.', difficulty: 'intermediate', category: 'appearance', synonyms: ['arrive', 'appear', 'turn up'] },
  { id: '82', verb: 'shut', particle: 'up', meaning: 'To stop talking (informal)', example: 'Shut up! I can\'t believe it!', example2: 'Tell him to shut up.', difficulty: 'intermediate', category: 'communication', synonyms: ['be quiet', 'silence', 'hush'] },
  { id: '83', verb: 'sit', particle: 'down', meaning: 'To take a seat', example: 'Please sit down and relax.', example2: 'He sat down at his desk.', difficulty: 'beginner', category: 'movement', synonyms: ['be seated', 'take a seat'] },
  { id: '84', verb: 'sort', particle: 'out', meaning: 'To resolve or organize', example: 'We need to sort out this problem.', example2: 'I\'ll sort out the paperwork.', difficulty: 'intermediate', category: 'action', synonyms: ['resolve', 'organize', 'fix'] },
  { id: '85', verb: 'speak', particle: 'up', meaning: 'To speak louder; to express opinion', example: 'Speak up, I can\'t hear you.', example2: 'You should speak up about your ideas.', difficulty: 'intermediate', category: 'communication', synonyms: ['talk louder', 'voice', 'assert'] },
  { id: '86', verb: 'stand', particle: 'out', meaning: 'To be noticeable or exceptional', example: 'Her talent really stands out.', example2: 'The red house stands out on the street.', difficulty: 'intermediate', category: 'appearance', synonyms: ['be noticeable', 'excel', 'distinguish'] },
  { id: '87', verb: 'stand', particle: 'up', meaning: 'To rise to standing position', example: 'Please stand up when the judge enters.', example2: 'He stood up and walked to the window.', difficulty: 'beginner', category: 'movement', synonyms: ['rise', 'get up', 'stand'] },
  { id: '88', verb: 'stay', particle: 'up', meaning: 'To remain awake late', example: 'I stayed up late watching movies.', example2: 'Don\'t stay up too late tonight.', difficulty: 'beginner', category: 'time', synonyms: ['remain awake', 'not sleep'] },
  { id: '89', verb: 'switch', particle: 'off', meaning: 'To turn off a device', example: 'Please switch off the lights.', example2: 'I switched off my phone during the meeting.', difficulty: 'beginner', category: 'action', synonyms: ['turn off', 'deactivate', 'shut down'] },
  { id: '90', verb: 'switch', particle: 'on', meaning: 'To turn on a device', example: 'Switch on the TV, the game is starting.', example2: 'He switched on the computer.', difficulty: 'beginner', category: 'action', synonyms: ['turn on', 'activate', 'start'] },
  { id: '91', verb: 'take', particle: 'after', meaning: 'To resemble a family member', example: 'She takes after her mother.', example2: 'He takes after his father in looks.', difficulty: 'intermediate', category: 'appearance', synonyms: ['resemble', 'look like', 'favor'] },
  { id: '92', verb: 'take', particle: 'away', meaning: 'To remove; to subtract', example: 'Take away these dirty dishes.', example2: 'If you take away 5 from 10, you get 5.', difficulty: 'beginner', category: 'action', synonyms: ['remove', 'subtract', 'eliminate'] },
  { id: '93', verb: 'take', particle: 'back', meaning: 'To return something; to retract', example: 'I take back what I said.', example2: 'Please take back this defective product.', difficulty: 'intermediate', category: 'action', synonyms: ['return', 'retract', 'withdraw'] },
  { id: '94', verb: 'take', particle: 'care of', meaning: 'To look after; to handle', example: 'I\'ll take care of the arrangements.', example2: 'Take care of yourself!', difficulty: 'beginner', category: 'care', synonyms: ['look after', 'handle', 'manage'] },
  { id: '95', verb: 'take', particle: 'off', meaning: 'To remove; to depart', example: 'Please take off your shoes.', example2: 'The plane took off on time.', difficulty: 'beginner', category: 'action', synonyms: ['remove', 'depart', 'leave'] },
  { id: '96', verb: 'take', particle: 'on', meaning: 'To accept a challenge; to employ', example: 'We\'re taking on new staff.', example2: 'I can\'t take on any more work.', difficulty: 'intermediate', category: 'work', synonyms: ['accept', 'undertake', 'employ'] },
  { id: '97', verb: 'take', particle: 'out', meaning: 'To remove; to invite on a date', example: 'Take out your notebooks, please.', example2: 'He took her out for dinner.', difficulty: 'beginner', category: 'action', synonyms: ['remove', 'extract', 'date'] },
  { id: '98', verb: 'take', particle: 'over', meaning: 'To assume control', example: 'The new manager took over last month.', example2: 'The army took over the government.', difficulty: 'intermediate', category: 'control', synonyms: ['assume control', 'seize', 'assume'] },
  { id: '99', verb: 'talk', particle: 'about', meaning: 'To discuss a topic', example: 'We talked about our plans for the weekend.', example2: 'What are you talking about?', difficulty: 'beginner', category: 'communication', synonyms: ['discuss', 'converse about', 'mention'] },
  { id: '100', verb: 'tell', particle: 'off', meaning: 'To scold or reprimand', example: 'The teacher told him off for being late.', example2: 'My boss told me off for making mistakes.', difficulty: 'intermediate', category: 'communication', synonyms: ['scold', 'reprimand', 'rebuke'] },

  // 101-120
  { id: '101', verb: 'think', particle: 'about', meaning: 'To consider or reflect on', example: 'I\'m thinking about changing jobs.', example2: 'Think about what you want to say.', difficulty: 'beginner', category: 'thinking', synonyms: ['consider', 'ponder', 'reflect'] },
  { id: '102', verb: 'think', particle: 'over', meaning: 'To consider carefully', example: 'I need to think over your proposal.', example2: 'Take your time and think it over.', difficulty: 'intermediate', category: 'thinking', synonyms: ['consider', 'deliberate', 'ponder'] },
  { id: '103', verb: 'throw', particle: 'away', meaning: 'To discard or dispose of', example: 'Throw away those old newspapers.', example2: 'Don\'t throw away your chance!', difficulty: 'beginner', category: 'action', synonyms: ['discard', 'dispose of', 'toss'] },
  { id: '104', verb: 'try', particle: 'on', meaning: 'To test clothing by wearing', example: 'Try on these shoes to see if they fit.', example2: 'I tried on five dresses before choosing one.', difficulty: 'beginner', category: 'shopping', synonyms: ['test', 'sample', 'fit check'] },
  { id: '105', verb: 'try', particle: 'out', meaning: 'To test or experiment with', example: 'We\'re trying out a new software system.', example2: 'Try out this recipe and tell me what you think.', difficulty: 'intermediate', category: 'testing', synonyms: ['test', 'evaluate', 'sample'] },
  { id: '106', verb: 'turn', particle: 'around', meaning: 'To reverse direction; to improve', example: 'Turn around and look at me.', example2: 'The company turned around after the new CEO arrived.', difficulty: 'intermediate', category: 'movement', synonyms: ['reverse', 'rotate', 'improve'] },
  { id: '107', verb: 'turn', particle: 'down', meaning: 'To reject or reduce', example: 'They turned down my job application.', example2: 'Please turn down the music.', difficulty: 'intermediate', category: 'action', synonyms: ['reject', 'refuse', 'lower'] },
  { id: '108', verb: 'turn', particle: 'into', meaning: 'To transform or become', example: 'The frog turned into a prince.', example2: 'We\'re turning the garage into an office.', difficulty: 'intermediate', category: 'transformation', synonyms: ['transform', 'become', 'convert'] },
  { id: '109', verb: 'turn', particle: 'off', meaning: 'To deactivate a device', example: 'Please turn off the lights.', example2: 'I turned off my phone during the movie.', difficulty: 'beginner', category: 'action', synonyms: ['switch off', 'deactivate', 'shut down'] },
  { id: '110', verb: 'turn', particle: 'on', meaning: 'To activate a device', example: 'Turn on the TV, the game is starting.', example2: 'He turned on the computer.', difficulty: 'beginner', category: 'action', synonyms: ['switch on', 'activate', 'start'] },
  { id: '111', verb: 'turn', particle: 'out', meaning: 'To result in; to produce', example: 'The party turned out great.', example2: 'Turn out the lights before bed.', difficulty: 'intermediate', category: 'result', synonyms: ['result', 'prove', 'produce'] },
  { id: '112', verb: 'turn', particle: 'up', meaning: 'To increase volume; to arrive', example: 'Turn up the music!', example2: 'He didn\'t turn up for work today.', difficulty: 'intermediate', category: 'action', synonyms: ['increase', 'arrive', 'appear'] },
  { id: '113', verb: 'wake', particle: 'up', meaning: 'To stop sleeping', example: 'I wake up at 6 AM every day.', example2: 'Wake up! It\'s time for school.', difficulty: 'beginner', category: 'sleep', synonyms: ['awaken', 'rouse', 'get up'] },
  { id: '114', verb: 'warm', particle: 'up', meaning: 'To prepare for exercise; to heat', example: 'Warm up before you start running.', example2: 'I need to warm up my lunch.', difficulty: 'beginner', category: 'preparation', synonyms: ['prepare', 'heat', 'loosen up'] },
  { id: '115', verb: 'watch', particle: 'out', meaning: 'To be careful or alert', example: 'Watch out! A car is coming.', example2: 'Watch out for pickpockets in this area.', difficulty: 'beginner', category: 'attention', synonyms: ['be careful', 'beware', 'look out'] },
  { id: '116', verb: 'work', particle: 'out', meaning: 'To exercise; to solve', example: 'I work out at the gym three times a week.', example2: 'We need to work out this problem.', difficulty: 'intermediate', category: 'action', synonyms: ['exercise', 'solve', 'calculate'] },
  { id: '117', verb: 'write', particle: 'down', meaning: 'To record in writing', example: 'Write down your ideas before you forget.', example2: 'I wrote down her phone number.', difficulty: 'beginner', category: 'communication', synonyms: ['record', 'note', 'jot down'] },
  { id: '118', verb: 'ask', particle: 'out', meaning: 'To invite on a date', example: 'He asked her out to dinner.', example2: 'I\'m too shy to ask him out.', difficulty: 'intermediate', category: 'social', synonyms: ['invite', 'ask for a date'] },
  { id: '119', verb: 'back', particle: 'up', meaning: 'To support; to make a copy', example: 'I back up my files every day.', example2: 'My friends backed me up in the argument.', difficulty: 'intermediate', category: 'support', synonyms: ['support', 'copy', 'defend'] },
  { id: '120', verb: 'break', particle: 'down', meaning: 'To stop functioning; to analyze', example: 'My car broke down on the highway.', example2: 'Let\'s break down the problem step by step.', difficulty: 'intermediate', category: 'problems', synonyms: ['malfunction', 'analyze', 'fail'] },

  // 121-140
  { id: '121', verb: 'break', particle: 'up', meaning: 'To end a relationship; to separate', example: 'They broke up after five years together.', example2: 'The crowd started to break up.', difficulty: 'intermediate', category: 'relationships', synonyms: ['separate', 'split', 'disperse'] },
  { id: '122', verb: 'bring', particle: 'up', meaning: 'To raise a child; to mention', example: 'She brought up three children alone.', example2: 'Don\'t bring up that topic again.', difficulty: 'intermediate', category: 'life', synonyms: ['raise', 'mention', 'introduce'] },
  { id: '123', verb: 'brush', particle: 'up on', meaning: 'To review or improve skills', example: 'I need to brush up on my Spanish.', example2: 'Let me brush up on the rules before we play.', difficulty: 'advanced', category: 'learning', synonyms: ['review', 'refresh', 'improve'] },
  { id: '124', verb: 'calm', particle: 'down', meaning: 'To become less agitated', example: 'Calm down, everything will be fine.', example2: 'It took him a while to calm down.', difficulty: 'beginner', category: 'emotions', synonyms: ['relax', 'settle', 'compose'] },
  { id: '125', verb: 'catch', particle: 'up', meaning: 'To reach the same level', example: 'I need to catch up on sleep.', example2: 'Wait, I need to catch up with you.', difficulty: 'intermediate', category: 'progress', synonyms: ['reach', 'match', 'get up to date'] },
  { id: '126', verb: 'check', particle: 'in', meaning: 'To register at a hotel or airport', example: 'We need to check in at 3 PM.', example2: 'Please check in at the reception desk.', difficulty: 'beginner', category: 'travel', synonyms: ['register', 'arrive', 'report'] },
  { id: '127', verb: 'cheer', particle: 'up', meaning: 'To become happier', example: 'Cheer up! Things will get better.', example2: 'The good news cheered everyone up.', difficulty: 'beginner', category: 'emotions', synonyms: ['brighten', 'encourage', 'uplift'] },
  { id: '128', verb: 'clean', particle: 'up', meaning: 'To tidy thoroughly', example: 'We need to clean up this mess.', example2: 'Clean up your room before dinner.', difficulty: 'beginner', category: 'action', synonyms: ['tidy', 'clear', 'organize'] },
  { id: '129', verb: 'close', particle: 'down', meaning: 'To cease business operations', example: 'The factory closed down last year.', example2: 'Many small shops closed down during the pandemic.', difficulty: 'intermediate', category: 'business', synonyms: ['shut down', 'cease', 'close'] },
  { id: '130', verb: 'come', particle: 'across', meaning: 'To find by chance', example: 'I came across an old photo album.', example2: 'She came across some interesting facts.', difficulty: 'intermediate', category: 'discovery', synonyms: ['find', 'discover', 'encounter'] },
  { id: '131', verb: 'come', particle: 'apart', meaning: 'To break into pieces', example: 'The old book is coming apart.', example2: 'My shoes are coming apart at the seams.', difficulty: 'intermediate', category: 'condition', synonyms: ['break', 'separate', 'disintegrate'] },
  { id: '132', verb: 'come', particle: 'down with', meaning: 'To become ill', example: 'I\'ve come down with the flu.', example2: 'She came down with a bad cold.', difficulty: 'intermediate', category: 'health', synonyms: ['contract', 'catch', 'become ill'] },
  { id: '133', verb: 'come', particle: 'forward', meaning: 'To volunteer information', example: 'Witnesses came forward with new evidence.', example2: 'No one has come forward to claim the prize.', difficulty: 'advanced', category: 'action', synonyms: ['volunteer', 'step forward', 'offer'] },
  { id: '134', verb: 'come', particle: 'off', meaning: 'To succeed; to become detached', example: 'The plan came off perfectly.', example2: 'A button came off my shirt.', difficulty: 'advanced', category: 'result', synonyms: ['succeed', 'detach', 'occur'] },
  { id: '135', verb: 'come', particle: 'on', meaning: 'To hurry; to start functioning', example: 'Come on, we\'re going to be late!', example2: 'The heating came on automatically.', difficulty: 'beginner', category: 'action', synonyms: ['hurry', 'start', 'function'] },
  { id: '136', verb: 'come', particle: 'out', meaning: 'To be published; to emerge', example: 'Her new book comes out next month.', example2: 'The sun came out after the rain.', difficulty: 'intermediate', category: 'publication', synonyms: ['be published', 'emerge', 'appear'] },
  { id: '137', verb: 'come', particle: 'round', meaning: 'To regain consciousness; to visit', example: 'She came round after fainting.', example2: 'Come round for dinner sometime.', difficulty: 'intermediate', category: 'health', synonyms: ['regain consciousness', 'visit', 'drop by'] },
  { id: '138', verb: 'come', particle: 'up', meaning: 'To be mentioned; to approach', example: 'Your name came up in conversation.', example2: 'A problem came up at work.', difficulty: 'intermediate', category: 'action', synonyms: ['arise', 'approach', 'appear'] },
  { id: '139', verb: 'come', particle: 'up with', meaning: 'To think of an idea', example: 'She came up with a brilliant solution.', example2: 'Can you come up with any ideas?', difficulty: 'intermediate', category: 'thinking', synonyms: ['devise', 'conceive', 'produce'] },
  { id: '140', verb: 'count', particle: 'on', meaning: 'To rely on or depend on', example: 'You can count on me to help.', example2: 'I\'m counting on you to be there.', difficulty: 'intermediate', category: 'reliability', synonyms: ['rely on', 'depend on', 'trust'] },

  // 141-150
  { id: '141', verb: 'cross', particle: 'out', meaning: 'To delete by drawing a line through', example: 'Cross out the wrong answers.', example2: 'I crossed out my mistake and rewrote it.', difficulty: 'beginner', category: 'action', synonyms: ['delete', 'strike out', 'remove'] },
  { id: '142', verb: 'cut', particle: 'back', meaning: 'To reduce expenses or consumption', example: 'We need to cut back on spending.', example2: 'The company cut back on staff.', difficulty: 'intermediate', category: 'reduction', synonyms: ['reduce', 'decrease', 'curtail'] },
  { id: '143', verb: 'deal', particle: 'with', meaning: 'To handle or manage', example: 'I\'ll deal with this problem tomorrow.', example2: 'She deals with customer complaints.', difficulty: 'intermediate', category: 'action', synonyms: ['handle', 'manage', 'address'] },
  { id: '144', verb: 'do', particle: 'over', meaning: 'To redo or repeat', example: 'You\'ll have to do this essay over.', example2: 'We had to do over the entire project.', difficulty: 'intermediate', category: 'action', synonyms: ['redo', 'repeat', 'redo'] },
  { id: '145', verb: 'draw', particle: 'up', meaning: 'To prepare a document or plan', example: 'The lawyer drew up a contract.', example2: 'We need to draw up a list of requirements.', difficulty: 'advanced', category: 'creation', synonyms: ['prepare', 'draft', 'compose'] },
  { id: '146', verb: 'dress', particle: 'up', meaning: 'To wear formal clothes; to costume', example: 'We dressed up for the wedding.', example2: 'The children dressed up as superheroes.', difficulty: 'beginner', category: 'clothing', synonyms: ['wear formal clothes', 'costume'] },
  { id: '147', verb: 'drop', particle: 'out', meaning: 'To quit before completion', example: 'He dropped out of university.', example2: 'Two runners dropped out of the race.', difficulty: 'intermediate', category: 'education', synonyms: ['quit', 'withdraw', 'leave'] },
  { id: '148', verb: 'eat', particle: 'out', meaning: 'To dine at a restaurant', example: 'Let\'s eat out tonight.', example2: 'We eat out about once a week.', difficulty: 'beginner', category: 'food', synonyms: ['dine out', 'eat at a restaurant'] },
  { id: '149', verb: 'fall', particle: 'out', meaning: 'To argue and stop being friendly', example: 'They fell out over money.', example2: 'I haven\'t fallen out with her, we just drifted apart.', difficulty: 'intermediate', category: 'relationships', synonyms: ['argue', 'quarrel', 'disagree'] },
  { id: '150', verb: 'get', particle: 'along with', meaning: 'To have a good relationship', example: 'Do you get along with your colleagues?', example2: 'I get along well with my neighbors.', difficulty: 'beginner', category: 'relationships', synonyms: ['be friendly', 'cooperate'] },
];

// Categories for filtering
export const categories = [
  'all',
  'action',
  'movement',
  'thinking',
  'emotions',
  'communication',
  'work',
  'social',
  'relationships',
  'education',
  'technology',
  'travel',
  'health',
  'business',
  'food',
  'shopping',
];

// Difficulty levels
export const difficultyLevels = [
  { value: 'all', label: 'All Levels' },
  { value: 'beginner', label: 'Beginner' },
  { value: 'intermediate', label: 'Intermediate' },
  { value: 'advanced', label: 'Advanced' },
];

// Get verbs by category
export function getVerbsByCategory(category: string): PhrasalVerb[] {
  if (category === 'all') return phaveList;
  return phaveList.filter(verb => verb.category === category);
}

// Get verbs by difficulty
export function getVerbsByDifficulty(difficulty: string): PhrasalVerb[] {
  if (difficulty === 'all') return phaveList;
  return phaveList.filter(verb => verb.difficulty === difficulty);
}

// Get random verbs for quiz
export function getRandomVerbs(count: number): PhrasalVerb[] {
  const shuffled = [...phaveList].sort(() => Math.random() - 0.5);
  return shuffled.slice(0, count);
}

// Search verbs
export function searchVerbs(query: string): PhrasalVerb[] {
  const lowerQuery = query.toLowerCase();
  return phaveList.filter(verb =>
    verb.verb.toLowerCase().includes(lowerQuery) ||
    verb.particle.toLowerCase().includes(lowerQuery) ||
    verb.meaning.toLowerCase().includes(lowerQuery) ||
    verb.example.toLowerCase().includes(lowerQuery)
  );
}
