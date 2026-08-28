export const starterQuests = [
  // ==========================================
  // REALM 1: SYNTAX SANCTUARY (Levels 1 - 10)
  // ==========================================
  {
    id: 1,
    title: 'Echo Grove: First Words',
    taskName: 'Hello World',
    icon: '📜',
    world: 'Realm 1: Syntax Sanctuary',
    concept: 'Strings & print()',
    description: 'Cast your first Python invocation! Print the greeting "Hello, World!" to the terminal.',
    starterCode: 'print("Hello, World!")',
    expectedOutput: 'Hello, World!',
    hint: 'Use print() with the string enclosed inside quotes.',
    xp: 100
  },
  {
    id: 2,
    title: 'Operator Peaks: Math Sprint',
    taskName: 'Addition Operator',
    icon: '⚡',
    world: 'Realm 1: Syntax Sanctuary',
    concept: 'Arithmetic & +',
    description: 'Calculate the total energy needed to ascend the peak. Print the result of 7 + 8.',
    starterCode: 'print(7 + 8)',
    expectedOutput: '15',
    hint: 'Use the + operator inside print().',
    xp: 100
  },
  {
    id: 3,
    title: 'Subtraction Summit: Health Check',
    taskName: 'Subtraction Operator',
    icon: '🗡️',
    world: 'Realm 1: Syntax Sanctuary',
    concept: 'Arithmetic & -',
    description: 'A monster dealt 18 damage to your 50 HP. Print the remaining health (50 - 18).',
    starterCode: 'print(50 - 18)',
    expectedOutput: '32',
    hint: 'Use the - operator inside print().',
    xp: 100
  },
  {
    id: 4,
    title: 'Multiplication Mesa: Gold Piles',
    taskName: 'Multiplication Operator',
    icon: '🪙',
    world: 'Realm 1: Syntax Sanctuary',
    concept: 'Arithmetic & *',
    description: 'You found 6 chests containing 7 gold coins each. Print the total gold (6 * 7).',
    starterCode: 'print(6 * 7)',
    expectedOutput: '42',
    hint: 'Use the * multiplication operator.',
    xp: 100
  },
  {
    id: 5,
    title: 'Division Delta: Loot Share',
    taskName: 'Float Division',
    icon: '⚖️',
    world: 'Realm 1: Syntax Sanctuary',
    concept: 'Arithmetic & /',
    description: 'Split 20 gems equally among 4 party members. Print 20 / 4.',
    starterCode: 'print(20 / 4)',
    expectedOutput: '5.0',
    hint: 'Division / in Python always results in a float.',
    xp: 100
  },
  {
    id: 6,
    title: 'Floor Divide Cavern: Whole Potions',
    taskName: 'Floor Division',
    icon: '🧪',
    world: 'Realm 1: Syntax Sanctuary',
    concept: 'Floor Division //',
    description: 'You have 17 herb leaves and each potion takes 3 leaves. Print how many whole potions you can brew (17 // 3).',
    starterCode: 'print(17 // 3)',
    expectedOutput: '5',
    hint: 'Use the // operator for integer floor division.',
    xp: 100
  },
  {
    id: 7,
    title: 'Modulo Marsh: Leftover Reagents',
    taskName: 'Modulo Operator',
    icon: '🌿',
    world: 'Realm 1: Syntax Sanctuary',
    concept: 'Modulo %',
    description: 'Calculate the leftover herbs after brewing: print the remainder of 29 divided by 5 (29 % 5).',
    starterCode: 'print(29 % 5)',
    expectedOutput: '4',
    hint: 'Use the % operator for the remainder.',
    xp: 100
  },
  {
    id: 8,
    title: 'Power Plateau: Spell Amplification',
    taskName: 'Exponentiation',
    icon: '🔥',
    world: 'Realm 1: Syntax Sanctuary',
    concept: 'Power **',
    description: 'Amplify spell power by raising 2 to the power of 8. Print 2 ** 8.',
    starterCode: 'print(2 ** 8)',
    expectedOutput: '256',
    hint: 'Use the ** operator for exponentiation.',
    xp: 100
  },
  {
    id: 9,
    title: 'Type Altar: Inspecting Essences',
    taskName: 'Type Checking',
    icon: '🔮',
    world: 'Realm 1: Syntax Sanctuary',
    concept: 'type() built-in',
    description: 'Inspect the type name of "Python". Print type("Python").__name__.',
    starterCode: 'print(type("Python").__name__)',
    expectedOutput: 'str',
    hint: 'Use type("Python").__name__ to print "str".',
    xp: 100
  },
  {
    id: 10,
    title: 'String Duplicator: War Cry',
    taskName: 'String Multiplication',
    icon: '📣',
    world: 'Realm 1: Syntax Sanctuary',
    concept: 'String * Int',
    description: 'Repeat the war chant "Ha!" 3 times by multiplying the string. Print "Ha!" * 3.',
    starterCode: 'print("Ha!" * 3)',
    expectedOutput: 'Ha!Ha!Ha!',
    hint: 'Multiplying a string by an integer repeats it.',
    xp: 100
  },

  // ==========================================
  // REALM 2: VARIABLE VAULTS (Levels 11 - 20)
  // ==========================================
  {
    id: 11,
    title: 'Memory Vault: Variable Tag',
    taskName: 'Variable Assignment',
    icon: '🗝️',
    world: 'Realm 2: Variable Vaults',
    concept: 'Variables',
    description: 'Assign the hero name "Ada" to a variable named hero, then print(hero).',
    starterCode: 'hero = "Ada"\nprint(hero)',
    expectedOutput: 'Ada',
    hint: 'Set hero = "Ada" and then print(hero).',
    xp: 120
  },
  {
    id: 12,
    title: 'Integer Forge: Stacking Stats',
    taskName: 'Variable Addition',
    icon: '🛡️',
    world: 'Realm 2: Variable Vaults',
    concept: 'Integer Variables',
    description: 'Create base_hp = 100 and bonus_hp = 50. Print their sum.',
    starterCode: 'base_hp = 100\nbonus_hp = 50\nprint(base_hp + bonus_hp)',
    expectedOutput: '150',
    hint: 'Add the two variables together.',
    xp: 120
  },
  {
    id: 13,
    title: 'Precision Pond: Floating Point',
    taskName: 'Float Variables & round()',
    icon: '💧',
    world: 'Realm 2: Variable Vaults',
    concept: 'Floats & round()',
    description: 'Given pi = 3.14159, print it rounded to 2 decimal places using round(pi, 2).',
    starterCode: 'pi = 3.14159\nprint(round(pi, 2))',
    expectedOutput: '3.14',
    hint: 'Call round(pi, 2).',
    xp: 120
  },
  {
    id: 14,
    title: 'Beacon of Truth: Booleans',
    taskName: 'Boolean Values',
    icon: '💡',
    world: 'Realm 2: Variable Vaults',
    concept: 'Booleans',
    description: 'Create a variable quest_active = True and print it.',
    starterCode: 'quest_active = True\nprint(quest_active)',
    expectedOutput: 'True',
    hint: 'Capitalize True in Python.',
    xp: 120
  },
  {
    id: 15,
    title: 'Transmutation Altar: Int to Str',
    taskName: 'str() Conversion',
    icon: '✨',
    world: 'Realm 2: Variable Vaults',
    concept: 'Type Casting',
    description: 'Convert integer level = 50 into a string and concatenate it: print("Level " + str(50)).',
    starterCode: 'print("Level " + str(50))',
    expectedOutput: 'Level 50',
    hint: 'Use str(50) to cast integer to string.',
    xp: 120
  },
  {
    id: 16,
    title: 'Runic Parser: Str to Int',
    taskName: 'int() Conversion',
    icon: '📜',
    world: 'Realm 2: Variable Vaults',
    concept: 'Type Casting',
    description: 'Parse the string damage = "25" to an integer and multiply it by 4. Print int("25") * 4.',
    starterCode: 'print(int("25") * 4)',
    expectedOutput: '100',
    hint: 'Use int() to parse the number.',
    xp: 120
  },
  {
    id: 17,
    title: 'Twin Crystals: Multiple Assignment',
    taskName: 'Multi-variable Unpacking',
    icon: '💎',
    world: 'Realm 2: Variable Vaults',
    concept: 'Multiple Assignment',
    description: 'Assign x, y = 10, 20 on one line, then print(x + y).',
    starterCode: 'x, y = 10, 20\nprint(x + y)',
    expectedOutput: '30',
    hint: 'Assign both in one line with comma separation.',
    xp: 120
  },
  {
    id: 18,
    title: 'Mirror Switch: Variable Swap',
    taskName: 'Tuple Swapping',
    icon: '🪞',
    world: 'Realm 2: Variable Vaults',
    concept: 'Pythonic Swapping',
    description: 'Given a = 1 and b = 2, swap them using a, b = b, a, then print(a, b).',
    starterCode: 'a = 1\nb = 2\na, b = b, a\nprint(a, b)',
    expectedOutput: '2 1',
    hint: 'Use a, b = b, a to swap.',
    xp: 120
  },
  {
    id: 19,
    title: 'Accumulator Core: In-Place Add',
    taskName: 'Augmented Assignment',
    icon: '🔋',
    world: 'Realm 2: Variable Vaults',
    concept: '+= Operator',
    description: 'Start with score = 100, add 25 using score += 25, and print(score).',
    starterCode: 'score = 100\nscore += 25\nprint(score)',
    expectedOutput: '125',
    hint: 'Use += operator.',
    xp: 120
  },
  {
    id: 20,
    title: 'F-String Forge: Formatted Spell',
    taskName: 'F-Strings',
    icon: '🎯',
    world: 'Realm 2: Variable Vaults',
    concept: 'String Formatting',
    description: 'Given name = "Python" and rank = 1, print the formatted string f"{name} is #{rank}".',
    starterCode: 'name = "Python"\nrank = 1\nprint(f"{name} is #{rank}")',
    expectedOutput: 'Python is #1',
    hint: 'Prefix string with f and use curly braces.',
    xp: 120
  },

  // ==========================================
  // REALM 3: STRING SORCERY (Levels 21 - 30)
  // ==========================================
  {
    id: 21,
    title: 'Scroll Length: Measuring Text',
    taskName: 'len() with Strings',
    icon: '📏',
    world: 'Realm 3: String Sorcery',
    concept: 'len()',
    description: 'Calculate the total characters in "Python Quest" and print it.',
    starterCode: 'print(len("Python Quest"))',
    expectedOutput: '12',
    hint: 'Spaces count towards len().',
    xp: 140
  },
  {
    id: 22,
    title: 'First Rune: Index Zero',
    taskName: 'String Indexing',
    icon: '🔤',
    world: 'Realm 3: String Sorcery',
    concept: 'Indexing [0]',
    description: 'Extract and print the first character of "Dragon" using indexing.',
    starterCode: 'spell = "Dragon"\nprint(spell[0])',
    expectedOutput: 'D',
    hint: 'Indexing starts at 0.',
    xp: 140
  },
  {
    id: 23,
    title: 'Tail Rune: Negative Index',
    taskName: 'Negative Indexing',
    icon: '🐉',
    world: 'Realm 3: String Sorcery',
    concept: 'Indexing [-1]',
    description: 'Extract and print the last character of "Phoenix" using negative indexing [-1].',
    starterCode: 'creature = "Phoenix"\nprint(creature[-1])',
    expectedOutput: 'x',
    hint: 'Use [-1] for the last item.',
    xp: 140
  },
  {
    id: 24,
    title: 'Slice Scriptor: Substrings',
    taskName: 'String Slicing',
    icon: '✂️',
    world: 'Realm 3: String Sorcery',
    concept: 'Slicing [start:end]',
    description: 'Extract the first 3 letters of "Sorcerer" using [0:3] and print it.',
    starterCode: 'word = "Sorcerer"\nprint(word[0:3])',
    expectedOutput: 'Sor',
    hint: 'Slice word[0:3].',
    xp: 140
  },
  {
    id: 25,
    title: 'Upper Chamber: Shouting Spells',
    taskName: 'upper() Method',
    icon: '📢',
    world: 'Realm 3: String Sorcery',
    concept: 'str.upper()',
    description: 'Convert the incantation "abracadabra" to uppercase and print it.',
    starterCode: 'incantation = "abracadabra"\nprint(incantation.upper())',
    expectedOutput: 'ABRACADABRA',
    hint: 'Call .upper() on the string.',
    xp: 140
  },
  {
    id: 26,
    title: 'Lower Hollow: Whispering',
    taskName: 'lower() Method',
    icon: '🤫',
    world: 'Realm 3: String Sorcery',
    concept: 'str.lower()',
    description: 'Convert "SHADOW" to lowercase and print it.',
    starterCode: 'print("SHADOW".lower())',
    expectedOutput: 'shadow',
    hint: 'Call .lower() on the string.',
    xp: 140
  },
  {
    id: 27,
    title: 'Purity Spring: Stripping Whitespace',
    taskName: 'strip() Method',
    icon: '🧼',
    world: 'Realm 3: String Sorcery',
    concept: 'str.strip()',
    description: 'Remove leading and trailing spaces from "   quest   " and print the clean string.',
    starterCode: 'raw = "   quest   "\nprint(raw.strip())',
    expectedOutput: 'quest',
    hint: 'Use .strip() to clean surrounding whitespace.',
    xp: 140
  },
  {
    id: 28,
    title: 'Transmutation Word: Replace',
    taskName: 'replace() Method',
    icon: '🔄',
    world: 'Realm 3: String Sorcery',
    concept: 'str.replace()',
    description: 'Replace "dark" with "light" in "dark sword" and print the result.',
    starterCode: 'weapon = "dark sword"\nprint(weapon.replace("dark", "light"))',
    expectedOutput: 'light sword',
    hint: 'Use .replace("old", "new").',
    xp: 140
  },
  {
    id: 29,
    title: 'Glyph Counter: Frequency',
    taskName: 'count() Method',
    icon: '🔢',
    world: 'Realm 3: String Sorcery',
    concept: 'str.count()',
    description: 'Count how many times the letter "a" appears in "abracadabra" and print it.',
    starterCode: 'print("abracadabra".count("a"))',
    expectedOutput: '5',
    hint: 'Use .count("a").',
    xp: 140
  },
  {
    id: 30,
    title: 'Time Reversal: Inverting Strings',
    taskName: 'Reverse Slice',
    icon: '⏳',
    world: 'Realm 3: String Sorcery',
    concept: 'Slice [::-1]',
    description: 'Reverse the string "quest" using step slicing [::-1] and print it.',
    starterCode: 'word = "quest"\nprint(word[::-1])',
    expectedOutput: 'tseuq',
    hint: 'Use [::-1] to reverse.',
    xp: 140
  },

  // ==========================================
  // REALM 4: LOGIC LABYRINTH (Levels 31 - 40)
  // ==========================================
  {
    id: 31,
    title: 'Equality Gate: Comparison',
    taskName: 'Equality Operator',
    icon: '🚪',
    world: 'Realm 4: Logic Labyrinth',
    concept: '== Operator',
    description: 'Check if 10 is equal to 10. Print the boolean result.',
    starterCode: 'print(10 == 10)',
    expectedOutput: 'True',
    hint: 'Use double equals ==.',
    xp: 160
  },
  {
    id: 32,
    title: 'Inequality Tower: Different Paths',
    taskName: 'Inequality Operator',
    icon: '🗼',
    world: 'Realm 4: Logic Labyrinth',
    concept: '!= Operator',
    description: 'Check if 5 is not equal to 9. Print 5 != 9.',
    starterCode: 'print(5 != 9)',
    expectedOutput: 'True',
    hint: 'Use != for not equal.',
    xp: 160
  },
  {
    id: 33,
    title: 'Threshold Sentinel: Greater Than',
    taskName: 'Comparison Operators',
    icon: '🛡️',
    world: 'Realm 4: Logic Labyrinth',
    concept: '> and < Operators',
    description: 'Verify if player level 25 is greater than boss requirement 20. Print 25 > 20.',
    starterCode: 'print(25 > 20)',
    expectedOutput: 'True',
    hint: 'Use >.',
    xp: 160
  },
  {
    id: 34,
    title: 'Even/Odd Gate: Modulo Check',
    taskName: 'Even Number Logic',
    icon: '🔮',
    world: 'Realm 4: Logic Labyrinth',
    concept: 'Modulo % Logic',
    description: 'Check if 10 is even using the modulo % operator and print True.',
    starterCode: 'print(10 % 2 == 0)',
    expectedOutput: 'True',
    hint: 'Use 10 % 2 == 0.',
    xp: 160
  },
  {
    id: 35,
    title: 'Dual Key Sanctum: Logical AND',
    taskName: 'and Operator',
    icon: '🗝️',
    world: 'Realm 4: Logic Labyrinth',
    concept: 'Logical and',
    description: 'Both conditions must hold: has_key = True and has_mana = True. Print has_key and has_mana.',
    starterCode: 'has_key = True\nhas_mana = True\nprint(has_key and has_mana)',
    expectedOutput: 'True',
    hint: 'and requires both operands to be True.',
    xp: 160
  },
  {
    id: 36,
    title: 'Portal of Choice: Logical OR',
    taskName: 'or Operator',
    icon: '🌀',
    world: 'Realm 4: Logic Labyrinth',
    concept: 'Logical or',
    description: 'Either shield or sword is equipped: print False or True.',
    starterCode: 'print(False or True)',
    expectedOutput: 'True',
    hint: 'or returns True if at least one is True.',
    xp: 160
  },
  {
    id: 37,
    title: 'Inversion Orb: Logical NOT',
    taskName: 'not Operator',
    icon: '🔮',
    world: 'Realm 4: Logic Labyrinth',
    concept: 'Logical not',
    description: 'Negate is_cursed = False by printing not is_cursed.',
    starterCode: 'is_cursed = False\nprint(not is_cursed)',
    expectedOutput: 'True',
    hint: 'not inverts boolean value.',
    xp: 160
  },
  {
    id: 38,
    title: 'Fork in the Path: If Statement',
    taskName: 'if / else Condition',
    icon: '🔀',
    world: 'Realm 4: Logic Labyrinth',
    concept: 'Conditional Branches',
    description: 'Check if gold >= 100. If True print "Rich", otherwise print "Need Gold".',
    starterCode: 'gold = 150\nif gold >= 100:\n    print("Rich")\nelse:\n    print("Need Gold")',
    expectedOutput: 'Rich',
    hint: 'Indent the block under if.',
    xp: 160
  },
  {
    id: 39,
    title: 'Chain of Bounds: Range Check',
    taskName: 'Chained Comparisons',
    icon: '⛓️',
    world: 'Realm 4: Logic Labyrinth',
    concept: 'Chained Operators',
    description: 'Check if score 85 is between 80 and 90: print(80 <= 85 <= 90).',
    starterCode: 'print(80 <= 85 <= 90)',
    expectedOutput: 'True',
    hint: 'Python supports chained comparisons directly.',
    xp: 160
  },
  {
    id: 40,
    title: 'Quick Decision: Ternary Expression',
    taskName: 'Inline Ternary',
    icon: '⚡',
    world: 'Realm 4: Logic Labyrinth',
    concept: 'Conditional Expression',
    description: 'Use a ternary operator to assign status = "Victory" if hp > 0 else "Defeat" with hp = 10, then print(status).',
    starterCode: 'hp = 10\nstatus = "Victory" if hp > 0 else "Defeat"\nprint(status)',
    expectedOutput: 'Victory',
    hint: 'Syntax: a if condition else b.',
    xp: 160
  },

  // ==========================================
  // REALM 5: LIST LABYRINTH (Levels 41 - 50)
  // ==========================================
  {
    id: 41,
    title: 'Array Archipelago: List Length',
    taskName: 'List Length',
    icon: '📦',
    world: 'Realm 5: List Labyrinth',
    concept: 'Lists & len()',
    description: 'Inspect the item inventory [1, 2, 3, 4] and print its length with len().',
    starterCode: 'items = [1, 2, 3, 4]\nprint(len(items))',
    expectedOutput: '4',
    hint: 'Call len(items).',
    xp: 180
  },
  {
    id: 42,
    title: 'Pouch Expander: list.append()',
    taskName: 'Adding Items to List',
    icon: '🎒',
    world: 'Realm 5: List Labyrinth',
    concept: 'list.append()',
    description: 'Create loot = ["ruby", "emerald"]. Append "diamond" and print(loot).',
    starterCode: 'loot = ["ruby", "emerald"]\nloot.append("diamond")\nprint(loot)',
    expectedOutput: "['ruby', 'emerald', 'diamond']",
    hint: 'Call loot.append("diamond").',
    xp: 180
  },
  {
    id: 43,
    title: 'Treasury Sum: Total Wealth',
    taskName: 'sum() on List',
    icon: '💰',
    world: 'Realm 5: List Labyrinth',
    concept: 'sum() built-in',
    description: 'Sum up all coin bags in [10, 20, 30, 40] using sum() and print it.',
    starterCode: 'coins = [10, 20, 30, 40]\nprint(sum(coins))',
    expectedOutput: '100',
    hint: 'Use sum(coins).',
    xp: 180
  },
  {
    id: 44,
    title: 'Apex Beacon: max()',
    taskName: 'Finding Maximum',
    icon: '🏔️',
    world: 'Realm 5: List Labyrinth',
    concept: 'max() built-in',
    description: 'Find the highest damage score among [45, 92, 78, 88] using max() and print it.',
    starterCode: 'scores = [45, 92, 78, 88]\nprint(max(scores))',
    expectedOutput: '92',
    hint: 'Call max(scores).',
    xp: 180
  },
  {
    id: 45,
    title: 'Valley Depth: min()',
    taskName: 'Finding Minimum',
    icon: '🕳️',
    world: 'Realm 5: List Labyrinth',
    concept: 'min() built-in',
    description: 'Find the lowest cooldown time among [12, 4, 19, 7] using min() and print it.',
    starterCode: 'cooldowns = [12, 4, 19, 7]\nprint(min(cooldowns))',
    expectedOutput: '4',
    hint: 'Call min(cooldowns).',
    xp: 180
  },
  {
    id: 46,
    title: 'Loot Slicer: Sub-list',
    taskName: 'List Slicing',
    icon: '🗡️',
    world: 'Realm 5: List Labyrinth',
    concept: 'List [start:end]',
    description: 'Extract elements at indices 1 and 2 from [10, 20, 30, 40] using slice [1:3] and print it.',
    starterCode: 'items = [10, 20, 30, 40]\nprint(items[1:3])',
    expectedOutput: '[20, 30]',
    hint: 'Slice items[1:3].',
    xp: 180
  },
  {
    id: 47,
    title: 'Discarding Relic: list.pop()',
    taskName: 'Removing Elements',
    icon: '🗑️',
    world: 'Realm 5: List Labyrinth',
    concept: 'list.pop()',
    description: 'Remove the last element of stack = [1, 2, 3] using pop() and print(stack).',
    starterCode: 'stack = [1, 2, 3]\nstack.pop()\nprint(stack)',
    expectedOutput: '[1, 2]',
    hint: 'Call stack.pop().',
    xp: 180
  },
  {
    id: 48,
    title: 'Rank Organizer: sorted()',
    taskName: 'Sorting Collections',
    icon: '📊',
    world: 'Realm 5: List Labyrinth',
    concept: 'sorted()',
    description: 'Sort the scores [50, 10, 40, 20] in ascending order using sorted() and print it.',
    starterCode: 'print(sorted([50, 10, 40, 20]))',
    expectedOutput: '[10, 20, 40, 50]',
    hint: 'Use sorted().',
    xp: 180
  },
  {
    id: 49,
    title: 'Immutable Vault: Tuples',
    taskName: 'Tuples Access',
    icon: '🔒',
    world: 'Realm 5: List Labyrinth',
    concept: 'Tuples ()',
    description: 'Define tuple coords = (100, 200) and print the x coordinate coords[0].',
    starterCode: 'coords = (100, 200)\nprint(coords[0])',
    expectedOutput: '100',
    hint: 'Tuples use parentheses and zero-indexing.',
    xp: 180
  },
  {
    id: 50,
    title: 'Inventory Sensor: in Keyword',
    taskName: 'Membership Testing',
    icon: '🔍',
    world: 'Realm 5: List Labyrinth',
    concept: 'in Operator',
    description: 'Check if "sword" is in ["shield", "potion", "sword"] and print the boolean result.',
    starterCode: 'print("sword" in ["shield", "potion", "sword"])',
    expectedOutput: 'True',
    hint: 'Use the in keyword.',
    xp: 180
  },

  // ==========================================
  // REALM 6: LOOP LAGOON (Levels 51 - 60)
  // ==========================================
  {
    id: 51,
    title: 'Step Counter: range() Loop',
    taskName: 'Basic for Loop',
    icon: '🔁',
    world: 'Realm 6: Loop Lagoon',
    concept: 'for loop & range()',
    description: 'Iterate over range(3) and print each number on a new line.',
    starterCode: 'for i in range(3):\n    print(i)',
    expectedOutput: '0\n1\n2',
    hint: 'range(3) yields 0, 1, 2.',
    xp: 200
  },
  {
    id: 52,
    title: 'Summoning Wave: Accumulating Range',
    taskName: 'sum(range())',
    icon: '🌊',
    world: 'Realm 6: Loop Lagoon',
    concept: 'range(start, stop)',
    description: 'Calculate and print the sum of numbers from 1 to 5 inclusive using sum(range(1, 6)).',
    starterCode: 'print(sum(range(1, 6)))',
    expectedOutput: '15',
    hint: 'range(1, 6) covers 1 through 5.',
    xp: 200
  },
  {
    id: 53,
    title: 'Echo Canyon: Iterating Lists',
    taskName: 'Looping Through Elements',
    icon: '📢',
    world: 'Realm 6: Loop Lagoon',
    concept: 'for item in list',
    description: 'Iterate over heroes = ["Ada", "Alan"] and print each name.',
    starterCode: 'heroes = ["Ada", "Alan"]\nfor hero in heroes:\n    print(hero)',
    expectedOutput: 'Ada\nAlan',
    hint: 'Iterate directly over the list.',
    xp: 200
  },
  {
    id: 54,
    title: 'Countdown Spire: while Loop',
    taskName: 'while Loop',
    icon: '⏳',
    world: 'Realm 6: Loop Lagoon',
    concept: 'while Condition',
    description: 'Start count = 3, while count > 0 print count and decrement count by 1.',
    starterCode: 'count = 3\nwhile count > 0:\n    print(count)\n    count -= 1',
    expectedOutput: '3\n2\n1',
    hint: 'Remember to decrement count inside the loop.',
    xp: 200
  },
  {
    id: 55,
    title: 'Numbered Roster: enumerate()',
    taskName: 'enumerate() Iteration',
    icon: '📝',
    world: 'Realm 6: Loop Lagoon',
    concept: 'enumerate()',
    description: 'Loop over ["apple", "berry"] with enumerate() and print each as f"{i}:{val}".',
    starterCode: 'for i, val in enumerate(["apple", "berry"]):\n    print(f"{i}:{val}")',
    expectedOutput: '0:apple\n1:berry',
    hint: 'enumerate gives both index and element.',
    xp: 200
  },
  {
    id: 56,
    title: 'Striding Stones: Range Step',
    taskName: 'range(start, stop, step)',
    icon: '🦘',
    world: 'Realm 6: Loop Lagoon',
    concept: 'range() Step',
    description: 'Generate even numbers from 0 to 8: convert list(range(0, 10, 2)) and print it.',
    starterCode: 'print(list(range(0, 10, 2)))',
    expectedOutput: '[0, 2, 4, 6, 8]',
    hint: 'The 3rd argument in range is the step size.',
    xp: 200
  },
  {
    id: 57,
    title: 'Break Barrier: Early Exit',
    taskName: 'break Statement',
    icon: '⛔',
    world: 'Realm 6: Loop Lagoon',
    concept: 'break',
    description: 'Loop over range(5). If i == 2, break out of loop. Print i for each iteration before breaking.',
    starterCode: 'for i in range(5):\n    if i == 2:\n        break\n    print(i)',
    expectedOutput: '0\n1',
    hint: 'break terminates loop immediately.',
    xp: 200
  },
  {
    id: 58,
    title: 'Skip Creek: continue Statement',
    taskName: 'continue Statement',
    icon: '⏭️',
    world: 'Realm 6: Loop Lagoon',
    concept: 'continue',
    description: 'Loop over range(4). If i == 2, continue to skip printing 2. Print all other values.',
    starterCode: 'for i in range(4):\n    if i == 2:\n        continue\n    print(i)',
    expectedOutput: '0\n1\n3',
    hint: 'continue jumps to next iteration.',
    xp: 200
  },
  {
    id: 59,
    title: 'Parallel Streams: zip()',
    taskName: 'zip() Collections',
    icon: '🔗',
    world: 'Realm 6: Loop Lagoon',
    concept: 'zip() built-in',
    description: 'Pair [1, 2] and ["a", "b"] together with list(zip([1, 2], ["a", "b"])) and print it.',
    starterCode: 'print(list(zip([1, 2], ["a", "b"])))',
    expectedOutput: "[(1, 'a'), (2, 'b')]",
    hint: 'zip pairs corresponding items.',
    xp: 200
  },
  {
    id: 60,
    title: 'Nested Matrix: Nested Loops',
    taskName: 'Nested Iteration',
    icon: '🕸️',
    world: 'Realm 6: Loop Lagoon',
    concept: 'Nested Loops',
    description: 'Iterate over row in [1, 2] and col in [10, 20], printing each product row * col.',
    starterCode: 'for row in [1, 2]:\n    for col in [10, 20]:\n        print(row * col)',
    expectedOutput: '10\n20\n20\n40',
    hint: 'Place inner loop inside outer loop.',
    xp: 200
  },

  // ==========================================
  // REALM 7: DICTIONARY DUNES (Levels 61 - 70)
  // ==========================================
  {
    id: 61,
    title: 'Rune Codex: Dictionary Lookup',
    taskName: 'Dict Access',
    icon: '📖',
    world: 'Realm 7: Dictionary Dunes',
    concept: 'Dictionaries {}',
    description: 'Create hero = {"class": "Mage", "hp": 100} and print hero["class"].',
    starterCode: 'hero = {"class": "Mage", "hp": 100}\nprint(hero["class"])',
    expectedOutput: 'Mage',
    hint: 'Access value by key in brackets.',
    xp: 220
  },
  {
    id: 62,
    title: 'Key Collector: dict.keys()',
    taskName: 'Extracting Keys',
    icon: '🗝️',
    world: 'Realm 7: Dictionary Dunes',
    concept: 'dict.keys()',
    description: 'Convert the keys of {"a": 1, "b": 2} to a list and print it: print(list({"a": 1, "b": 2}.keys())).',
    starterCode: 'print(list({"a": 1, "b": 2}.keys()))',
    expectedOutput: "['a', 'b']",
    hint: 'Wrap .keys() in list().',
    xp: 220
  },
  {
    id: 63,
    title: 'Value Harvester: dict.values()',
    taskName: 'Extracting Values',
    icon: '💎',
    world: 'Realm 7: Dictionary Dunes',
    concept: 'dict.values()',
    description: 'Sum all values in stats = {"atk": 15, "def": 25} and print sum(stats.values()).',
    starterCode: 'stats = {"atk": 15, "def": 25}\nprint(sum(stats.values()))',
    expectedOutput: '40',
    hint: 'Call sum() on stats.values().',
    xp: 220
  },
  {
    id: 64,
    title: 'Safe Retrieval: dict.get()',
    taskName: 'Safe Get with Default',
    icon: '🛡️',
    world: 'Realm 7: Dictionary Dunes',
    concept: 'dict.get(key, default)',
    description: 'Retrieve key "mana" from inv = {"hp": 50} with default 0 using inv.get("mana", 0) and print it.',
    starterCode: 'inv = {"hp": 50}\nprint(inv.get("mana", 0))',
    expectedOutput: '0',
    hint: '.get() returns the default if key is missing.',
    xp: 220
  },
  {
    id: 65,
    title: 'Registry Update: Adding Keys',
    taskName: 'Updating Dicts',
    icon: '📝',
    world: 'Realm 7: Dictionary Dunes',
    concept: 'dict[key] = val',
    description: 'Given d = {"x": 1}, assign d["y"] = 2 and print len(d).',
    starterCode: 'd = {"x": 1}\nd["y"] = 2\nprint(len(d))',
    expectedOutput: '2',
    hint: 'Assigning to new key adds it to dictionary.',
    xp: 220
  },
  {
    id: 66,
    title: 'Unique Prism: set()',
    taskName: 'Deduplicating with set()',
    icon: '🔮',
    world: 'Realm 7: Dictionary Dunes',
    concept: 'set() & Uniqueness',
    description: 'Count unique items in list [1, 2, 2, 3, 3, 3] by printing len(set([1, 2, 2, 3, 3, 3])).',
    starterCode: 'print(len(set([1, 2, 2, 3, 3, 3])))',
    expectedOutput: '3',
    hint: 'Sets eliminate duplicates automatically.',
    xp: 220
  },
  {
    id: 67,
    title: 'Guild Fusion: Set Union',
    taskName: 'Set Union |',
    icon: '🤝',
    world: 'Realm 7: Dictionary Dunes',
    concept: 'Set Union |',
    description: 'Combine sets a = {1, 2} and b = {2, 3} using union | and print the length of their union.',
    starterCode: 'a = {1, 2}\nb = {2, 3}\nprint(len(a | b))',
    expectedOutput: '3',
    hint: 'Use | or a.union(b).',
    xp: 220
  },
  {
    id: 68,
    title: 'Common Ground: Set Intersection',
    taskName: 'Set Intersection &',
    icon: '🎯',
    world: 'Realm 7: Dictionary Dunes',
    concept: 'Set Intersection &',
    description: 'Find common elements between {1, 2, 3} and {2, 3, 4} using & and print the sorted list.',
    starterCode: 'print(sorted(list({1, 2, 3} & {2, 3, 4})))',
    expectedOutput: '[2, 3]',
    hint: 'Use & for intersection.',
    xp: 220
  },
  {
    id: 69,
    title: 'Exclusion Zone: Set Difference',
    taskName: 'Set Difference -',
    icon: '✂️',
    world: 'Realm 7: Dictionary Dunes',
    concept: 'Set Difference -',
    description: 'Subtract set {2} from {1, 2, 3} using difference - and print the sorted list.',
    starterCode: 'print(sorted(list({1, 2, 3} - {2})))',
    expectedOutput: '[1, 3]',
    hint: 'Use - for set difference.',
    xp: 220
  },
  {
    id: 70,
    title: 'Codex Generator: Dict Comprehension',
    taskName: 'Dict Comprehension',
    icon: '⚡',
    world: 'Realm 7: Dictionary Dunes',
    concept: '{k: v for ...}',
    description: 'Build square map {x: x**2 for x in range(3)} and print it.',
    starterCode: 'print({x: x**2 for x in range(3)})',
    expectedOutput: '{0: 0, 1: 1, 2: 4}',
    hint: 'Use dict comprehension syntax.',
    xp: 220
  },

  // ==========================================
  // REALM 8: FUNCTION FORTRESS (Levels 71 - 80)
  // ==========================================
  {
    id: 71,
    title: 'Spell Inscription: def Function',
    taskName: 'Defining Functions',
    icon: '📜',
    world: 'Realm 8: Function Fortress',
    concept: 'def & return',
    description: 'Define function cast_spell() that returns "Fireball!" and print its return value.',
    starterCode: 'def cast_spell():\n    return "Fireball!"\n\nprint(cast_spell())',
    expectedOutput: 'Fireball!',
    hint: 'Use def to declare function and return to send value back.',
    xp: 250
  },
  {
    id: 72,
    title: 'Power Multiplier: Function Parameter',
    taskName: 'Function Arguments',
    icon: '⚡',
    world: 'Realm 8: Function Fortress',
    concept: 'Parameters',
    description: 'Define function square(n) that returns n * n. Call square(6) and print the result.',
    starterCode: 'def square(n):\n    return n * n\n\nprint(square(6))',
    expectedOutput: '36',
    hint: 'Pass 6 as parameter.',
    xp: 250
  },
  {
    id: 73,
    title: 'Default Rune: Default Arguments',
    taskName: 'Default Parameters',
    icon: '⚙️',
    world: 'Realm 8: Function Fortress',
    concept: 'Default Arguments',
    description: 'Define power(base, exp=3) that returns base ** exp. Print power(2).',
    starterCode: 'def power(base, exp=3):\n    return base ** exp\n\nprint(power(2))',
    expectedOutput: '8',
    hint: 'Calling power(2) uses default exp=3.',
    xp: 250
  },
  {
    id: 74,
    title: 'Dual Relic: Returning Multiple Values',
    taskName: 'Tuple Returns',
    icon: '💎',
    world: 'Realm 8: Function Fortress',
    concept: 'Multiple Returns',
    description: 'Define min_max(a, b) returning min(a, b), max(a, b). Call min_max(10, 4) and print it.',
    starterCode: 'def min_max(a, b):\n    return min(a, b), max(a, b)\n\nprint(min_max(10, 4))',
    expectedOutput: '(4, 10)',
    hint: 'Returning comma-separated values returns a tuple.',
    xp: 250
  },
  {
    id: 75,
    title: 'Quick Incantation: Lambda',
    taskName: 'Anonymous Lambda Functions',
    icon: '⚡',
    world: 'Realm 8: Function Fortress',
    concept: 'lambda x: expr',
    description: 'Create a lambda double = lambda x: x * 2. Print double(7).',
    starterCode: 'double = lambda x: x * 2\nprint(double(7))',
    expectedOutput: '14',
    hint: 'Lambdas are concise single-expression functions.',
    xp: 250
  },
  {
    id: 76,
    title: 'Transformation Wave: map()',
    taskName: 'map() Function',
    icon: '🌊',
    world: 'Realm 8: Function Fortress',
    concept: 'map()',
    description: 'Use map() with lambda x: x + 10 over [1, 2, 3]. Print list(map(...)).',
    starterCode: 'print(list(map(lambda x: x + 10, [1, 2, 3])))',
    expectedOutput: '[11, 12, 13]',
    hint: 'Convert map object to list().',
    xp: 250
  },
  {
    id: 77,
    title: 'Filter Sieve: filter()',
    taskName: 'filter() Function',
    icon: '🧹',
    world: 'Realm 8: Function Fortress',
    concept: 'filter()',
    description: 'Filter numbers greater than 5 from [2, 7, 3, 9, 4] using filter() and print the list.',
    starterCode: 'print(list(filter(lambda x: x > 5, [2, 7, 3, 9, 4])))',
    expectedOutput: '[7, 9]',
    hint: 'filter keeps elements where lambda returns True.',
    xp: 250
  },
  {
    id: 78,
    title: 'Infinite Satchel: *args',
    taskName: 'Variable Positional Arguments',
    icon: '🎒',
    world: 'Realm 8: Function Fortress',
    concept: '*args',
    description: 'Define sum_all(*args) returning sum(args). Print sum_all(1, 2, 3, 4, 5).',
    starterCode: 'def sum_all(*args):\n    return sum(args)\n\nprint(sum_all(1, 2, 3, 4, 5))',
    expectedOutput: '15',
    hint: '*args gathers arguments into a tuple.',
    xp: 250
  },
  {
    id: 79,
    title: 'Config Vault: **kwargs',
    taskName: 'Variable Keyword Arguments',
    icon: '🗃️',
    world: 'Realm 8: Function Fortress',
    concept: '**kwargs',
    description: 'Define count_props(**kwargs) returning len(kwargs). Print count_props(a=1, b=2, c=3).',
    starterCode: 'def count_props(**kwargs):\n    return len(kwargs)\n\nprint(count_props(a=1, b=2, c=3))',
    expectedOutput: '3',
    hint: '**kwargs gathers keyword arguments into a dict.',
    xp: 250
  },
  {
    id: 80,
    title: 'Recursive Mirror: Factorial',
    taskName: 'Recursion',
    icon: '🪞',
    world: 'Realm 8: Function Fortress',
    concept: 'Recursive Functions',
    description: 'Define recursive factorial(n): return 1 if n <= 1 else n * factorial(n-1). Print factorial(5).',
    starterCode: 'def factorial(n):\n    return 1 if n <= 1 else n * factorial(n - 1)\n\nprint(factorial(5))',
    expectedOutput: '120',
    hint: 'Factorial of 5 is 5 * 4 * 3 * 2 * 1 = 120.',
    xp: 250
  },

  // ==========================================
  // REALM 9: COMPREHENSION CITADEL (Levels 81 - 90)
  // ==========================================
  {
    id: 81,
    title: 'List Synthesizer: List Comprehension',
    taskName: 'Basic List Comprehension',
    icon: '✨',
    world: 'Realm 9: Comprehension Citadel',
    concept: '[expr for x in seq]',
    description: 'Generate double of numbers in [1, 2, 3, 4] using [x * 2 for x in [1, 2, 3, 4]] and print it.',
    starterCode: 'print([x * 2 for x in [1, 2, 3, 4]])',
    expectedOutput: '[2, 4, 6, 8]',
    hint: 'Use list comprehension.',
    xp: 280
  },
  {
    id: 82,
    title: 'Filtered Synthesis: Conditioned Comprehension',
    taskName: 'Comprehension with if',
    icon: '🔍',
    world: 'Realm 9: Comprehension Citadel',
    concept: '[x for x in seq if cond]',
    description: 'Filter even numbers from range(7) using [x for x in range(7) if x % 2 == 0] and print it.',
    starterCode: 'print([x for x in range(7) if x % 2 == 0])',
    expectedOutput: '[0, 2, 4, 6]',
    hint: 'Add if condition to the end of comprehension.',
    xp: 280
  },
  {
    id: 83,
    title: 'Bridge of Words: str.join()',
    taskName: 'Joining Strings',
    icon: '🌉',
    world: 'Realm 9: Comprehension Citadel',
    concept: 'delimiter.join(list)',
    description: 'Join ["Python", "Quest", "Game"] with hyphens "-" and print the joined string.',
    starterCode: 'print("-".join(["Python", "Quest", "Game"]))',
    expectedOutput: 'Python-Quest-Game',
    hint: 'Use "-".join(...).',
    xp: 280
  },
  {
    id: 84,
    title: 'Word Shatterer: str.split()',
    taskName: 'Splitting Strings',
    icon: '💥',
    world: 'Realm 9: Comprehension Citadel',
    concept: 'str.split(delimiter)',
    description: 'Split "fire,ice,lightning" by comma and print the resulting list.',
    starterCode: 'print("fire,ice,lightning".split(","))',
    expectedOutput: "['fire', 'ice', 'lightning']",
    hint: 'Call .split(",").',
    xp: 280
  },
  {
    id: 85,
    title: 'Oracle of Any: any() Built-in',
    taskName: 'any() Function',
    icon: '👁️',
    world: 'Realm 9: Comprehension Citadel',
    concept: 'any()',
    description: 'Check if any value in [False, False, True] is True using any() and print it.',
    starterCode: 'print(any([False, False, True]))',
    expectedOutput: 'True',
    hint: 'any() returns True if at least one element is truthy.',
    xp: 280
  },
  {
    id: 86,
    title: 'Shield of All: all() Built-in',
    taskName: 'all() Function',
    icon: '🛡️',
    world: 'Realm 9: Comprehension Citadel',
    concept: 'all()',
    description: 'Check if all numbers in [5, 10, 15] are greater than 0 using all(x > 0 for x in [5, 10, 15]) and print it.',
    starterCode: 'print(all(x > 0 for x in [5, 10, 15]))',
    expectedOutput: 'True',
    hint: 'all() returns True only if all elements are truthy.',
    xp: 280
  },
  {
    id: 87,
    title: 'Absolute Shrine: abs()',
    taskName: 'Absolute Value',
    icon: '📏',
    world: 'Realm 9: Comprehension Citadel',
    concept: 'abs() built-in',
    description: 'Calculate the absolute difference abs(-42) and print it.',
    starterCode: 'print(abs(-42))',
    expectedOutput: '42',
    hint: 'abs() returns magnitude without sign.',
    xp: 280
  },
  {
    id: 88,
    title: 'Rounding Altar: round() Nearest',
    taskName: 'round() Function',
    icon: '⚖️',
    world: 'Realm 9: Comprehension Citadel',
    concept: 'round()',
    description: 'Round 3.7 to the nearest integer and print it.',
    starterCode: 'print(round(3.7))',
    expectedOutput: '4',
    hint: 'Call round(3.7).',
    xp: 280
  },
  {
    id: 89,
    title: 'Dictionary Zip: dict(zip())',
    taskName: 'Creating Dict from Parallel Lists',
    icon: '🗄️',
    world: 'Realm 9: Comprehension Citadel',
    concept: 'dict(zip(keys, vals))',
    description: 'Build a dict from keys ["a", "b"] and vals [10, 20] using dict(zip(...)) and print it.',
    starterCode: 'keys = ["a", "b"]\nvals = [10, 20]\nprint(dict(zip(keys, vals)))',
    expectedOutput: "{'a': 10, 'b': 20}",
    hint: 'Wrap zip in dict().',
    xp: 280
  },
  {
    id: 90,
    title: 'Matrix Flattener: 2D Flattening',
    taskName: 'Flattening Lists',
    icon: '🥞',
    world: 'Realm 9: Comprehension Citadel',
    concept: 'Nested Comprehensions',
    description: 'Flatten matrix = [[1, 2], [3, 4]] into [1, 2, 3, 4] using list comprehension and print it.',
    starterCode: 'matrix = [[1, 2], [3, 4]]\nprint([num for row in matrix for num in row])',
    expectedOutput: '[1, 2, 3, 4]',
    hint: 'Iterate over row in matrix, then num in row.',
    xp: 280
  },

  // ==========================================
  // REALM 10: OOP & GRANDMASTER (Levels 91 - 100)
  // ==========================================
  {
    id: 91,
    title: 'Class Blueprint: Class Definition',
    taskName: 'Creating Classes',
    icon: '🏛️',
    world: 'Realm 10: OOP Grandmaster',
    concept: 'class keyword',
    description: 'Create empty class Hero: pass. Instantiate h = Hero() and print type(h).__name__.',
    starterCode: 'class Hero:\n    pass\n\nh = Hero()\nprint(type(h).__name__)',
    expectedOutput: 'Hero',
    hint: 'Use class Hero: pass.',
    xp: 300
  },
  {
    id: 92,
    title: 'Constructive Forge: __init__',
    taskName: 'Constructor Method',
    icon: '🔨',
    world: 'Realm 10: OOP Grandmaster',
    concept: '__init__()',
    description: 'Create class Player with __init__(self, name) setting self.name = name. Create p = Player("Arthur") and print(p.name).',
    starterCode: 'class Player:\n    def __init__(self, name):\n        self.name = name\n\np = Player("Arthur")\nprint(p.name)',
    expectedOutput: 'Arthur',
    hint: 'Initialize attributes inside __init__.',
    xp: 300
  },
  {
    id: 93,
    title: 'Method Invocation: Instance Methods',
    taskName: 'Class Methods',
    icon: '🧙‍♂️',
    world: 'Realm 10: OOP Grandmaster',
    concept: 'Methods on self',
    description: 'Add method attack(self) returning "Slash!" to class Warrior. Create w = Warrior() and print(w.attack()).',
    starterCode: 'class Warrior:\n    def attack(self):\n        return "Slash!"\n\nw = Warrior()\nprint(w.attack())',
    expectedOutput: 'Slash!',
    hint: 'Methods take self as first argument.',
    xp: 300
  },
  {
    id: 94,
    title: 'String Manifest: __str__',
    taskName: 'String Representation',
    icon: '📜',
    world: 'Realm 10: OOP Grandmaster',
    concept: '__str__()',
    description: 'Implement __str__(self) on class Weapon returning "Excalibur". Create sword = Weapon() and print(str(sword)).',
    starterCode: 'class Weapon:\n    def __str__(self):\n        return "Excalibur"\n\nsword = Weapon()\nprint(str(sword))',
    expectedOutput: 'Excalibur',
    hint: '__str__ returns human-readable representation.',
    xp: 300
  },
  {
    id: 95,
    title: 'Lineage Tower: Inheritance',
    taskName: 'Class Inheritance',
    icon: '🏰',
    world: 'Realm 10: OOP Grandmaster',
    concept: 'class Child(Parent)',
    description: 'Create class Entity with power = 100. Create class Dragon(Entity): pass and print Dragon.power.',
    starterCode: 'class Entity:\n    power = 100\n\nclass Dragon(Entity):\n    pass\n\nprint(Dragon.power)',
    expectedOutput: '100',
    hint: 'Child class inherits attributes from parent class.',
    xp: 300
  },
  {
    id: 96,
    title: 'Exception Ward: try / except',
    taskName: 'Exception Handling',
    icon: '🛡️',
    world: 'Realm 10: OOP Grandmaster',
    concept: 'try / except',
    description: 'Catch a ZeroDivisionError from 10 / 0 and print "Shield Activated" inside the except block.',
    starterCode: 'try:\n    result = 10 / 0\nexcept ZeroDivisionError:\n    print("Shield Activated")',
    expectedOutput: 'Shield Activated',
    hint: 'Use try: ... except ZeroDivisionError: ...',
    xp: 300
  },
  {
    id: 97,
    title: 'Arcane Module: import math',
    taskName: 'Math Standard Library',
    icon: '📐',
    world: 'Realm 10: OOP Grandmaster',
    concept: 'import math & sqrt',
    description: 'Import math and calculate int(math.sqrt(144)). Print the result.',
    starterCode: 'import math\nprint(int(math.sqrt(144)))',
    expectedOutput: '12',
    hint: 'math.sqrt(144) is 12.0, cast to int.',
    xp: 300
  },
  {
    id: 98,
    title: 'Deterministic Fate: random.seed',
    taskName: 'Random Library & Seeding',
    icon: '🎲',
    world: 'Realm 10: OOP Grandmaster',
    concept: 'import random',
    description: 'Import random, set random.seed(42), and print random.randint(1, 100).',
    starterCode: 'import random\nrandom.seed(42)\nprint(random.randint(1, 100))',
    expectedOutput: '82',
    hint: 'Seeding produces deterministic pseudo-random numbers.',
    xp: 300
  },
  {
    id: 99,
    title: 'Data Transmutation: import json',
    taskName: 'JSON Serialization',
    icon: '💾',
    world: 'Realm 10: OOP Grandmaster',
    concept: 'import json & dumps',
    description: 'Import json and serialize dict {"quest": 100, "status": "epic"} with json.dumps(). Print the result.',
    starterCode: 'import json\nprint(json.dumps({"quest": 100, "status": "epic"}))',
    expectedOutput: '{"quest": 100, "status": "epic"}',
    hint: 'Use json.dumps().',
    xp: 350
  },
  {
    id: 100,
    title: 'The Pinnacle of Mastery: Grandmaster',
    taskName: 'Grandmaster Finale',
    icon: '👑',
    world: 'Realm 10: OOP Grandmaster',
    concept: 'Python Mastery Completed',
    description: 'Claim your title as a Python Grandmaster! Print "I AM A PYTHON GRANDMASTER!" to complete all 100 levels.',
    starterCode: 'print("I AM A PYTHON GRANDMASTER!")',
    expectedOutput: 'I AM A PYTHON GRANDMASTER!',
    hint: 'Print the victory oath exactly as shown.',
    xp: 1000
  },

  // ==========================================
  // REALM 11: CAPSTONE REALM (Real-World Python Engineering, Levels 101 - 110)
  // ==========================================
  {
    id: 101,
    title: 'Capstone 1: Server Log ETL & Aggregator',
    taskName: 'Production Log Parsing',
    icon: '📊',
    world: 'Realm 11: Capstone Matrix',
    concept: 'Data Engineering & Parsing',
    isCapstone: true,
    description: 'Parse production web server logs to count error occurrences (status 404 or 500) per IP address, then print the sorted list of (IP, count) tuples.',
    starterCode: `logs = [
    "192.168.1.1 GET /index.html 200",
    "10.0.0.5 POST /login 404",
    "192.168.1.1 GET /about 200",
    "10.0.0.5 GET /favicon.ico 404",
    "172.16.0.2 POST /checkout 500"
]

error_counts = {}
for line in logs:
    ip, method, path, status = line.split()
    if status in ("404", "500"):
        error_counts[ip] = error_counts.get(ip, 0) + 1

print(sorted(error_counts.items()))`,
    expectedOutput: "[('10.0.0.5', 2), ('172.16.0.2', 1)]",
    hint: 'Split each log line by whitespace and check if status is in ("404", "500").',
    xp: 500
  },
  {
    id: 102,
    title: 'Capstone 2: REST API Payload Sanitizer',
    taskName: 'API Data Cleaning',
    icon: '🌐',
    world: 'Realm 11: Capstone Matrix',
    concept: 'Data Sanitization',
    isCapstone: true,
    description: 'Sanitize incoming user signup payload: trim name whitespace, lowercase email, and mask phone number keeping only last 4 digits ("***-4567"). Print clean dict.',
    starterCode: `raw_user = {
    "name": "   Alice Smith  ",
    "email": "ALICE@EXAMPLE.COM",
    "phone": "555-123-4567"
}

clean_user = {
    "name": raw_user["name"].strip(),
    "email": raw_user["email"].lower(),
    "phone": "***-" + raw_user["phone"].split("-")[-1]
}

print(clean_user)`,
    expectedOutput: "{'name': 'Alice Smith', 'email': 'alice@example.com', 'phone': '***-4567'}",
    hint: 'Use .strip(), .lower(), and string splitting to format the dictionary.',
    xp: 500
  },
  {
    id: 103,
    title: 'Capstone 3: LRU Memoization Decorator',
    taskName: 'Performance Caching',
    icon: '⚡',
    world: 'Realm 11: Capstone Matrix',
    concept: 'Decorators & Caching',
    isCapstone: true,
    description: 'Build a memoize caching decorator to optimize recursive calculations. Calculate fibonacci(6) with caching and print the result and base computation count.',
    starterCode: `call_count = 0

def memoize(func):
    cache = {}
    def wrapper(n):
        nonlocal call_count
        if n not in cache:
            call_count += 1
            cache[n] = func(n)
        return cache[n]
    return wrapper

@memoize
def fib(n):
    if n <= 1:
        return n
    return fib(n - 1) + fib(n - 2)

result = fib(6)
print(f"Fib: {result}, Computations: {call_count}")`,
    expectedOutput: 'Fib: 8, Computations: 7',
    hint: 'Store computed results in cache dictionary.',
    xp: 600
  },
  {
    id: 104,
    title: 'Capstone 4: Enterprise Password Policy Validator',
    taskName: 'Cybersecurity Validation',
    icon: '🔒',
    world: 'Realm 11: Capstone Matrix',
    concept: 'Security Policy',
    isCapstone: true,
    description: 'Enforce enterprise password rules: length >= 8, contains at least 1 digit, contains at least 1 uppercase. Filter and print valid passwords.',
    starterCode: `passwords = ["admin", "P@ssword1", "weakpass", "CyberQuest99", "SHORT1"]

def is_valid(p):
    return len(p) >= 8 and any(c.isdigit() for c in p) and any(c.isupper() for c in p)

valid = [p for p in passwords if is_valid(p)]
print(valid)`,
    expectedOutput: "['P@ssword1', 'CyberQuest99']",
    hint: 'Check len(p) >= 8, any(c.isdigit()), and any(c.isupper()).',
    xp: 600
  },
  {
    id: 105,
    title: 'Capstone 5: Fintech Portfolio Return & ROI',
    taskName: 'Financial Analytics',
    icon: '📈',
    world: 'Realm 11: Capstone Matrix',
    concept: 'Financial Math',
    isCapstone: true,
    description: 'Given quarterly portfolio values, calculate total ROI percentage rounded to 2 decimal places: ((final - initial) / initial) * 100.',
    starterCode: `portfolio = [10000.0, 11200.0, 10800.0, 13500.0]
initial_val = portfolio[0]
final_val = portfolio[-1]

roi = ((final_val - initial_val) / initial_val) * 100
print(f"Total ROI: {round(roi, 2)}%")`,
    expectedOutput: 'Total ROI: 35.0%',
    hint: 'Formula: ((final_val - initial_val) / initial_val) * 100.',
    xp: 700
  },
  {
    id: 106,
    title: 'Capstone 6: Asynchronous Pub-Sub Event Broker',
    taskName: 'System Architecture',
    icon: '📡',
    world: 'Realm 11: Capstone Matrix',
    concept: 'Event-Driven Systems',
    isCapstone: true,
    description: 'Create an EventBus class supporting subscribe and emit. Emit "USER_JOIN" to trigger all registered listener callbacks and print the resulting logs.',
    starterCode: `class EventBus:
    def __init__(self):
        self.listeners = {}
    
    def subscribe(self, event, callback):
        self.listeners.setdefault(event, []).append(callback)
        
    def emit(self, event, data):
        for cb in self.listeners.get(event, []):
            cb(data)

logs = []
bus = EventBus()
bus.subscribe("USER_JOIN", lambda u: logs.append(f"Welcome {u}!"))
bus.subscribe("USER_JOIN", lambda u: logs.append(f"Init inventory for {u}"))

bus.emit("USER_JOIN", "Neo")
print(logs)`,
    expectedOutput: "['Welcome Neo!', 'Init inventory for Neo']",
    hint: 'Store listeners list in dictionary per event key.',
    xp: 750
  },
  {
    id: 107,
    title: 'Capstone 7: Token Bucket API Rate Limiter',
    taskName: 'Cloud Infrastructure',
    icon: '🚰',
    world: 'Realm 11: Capstone Matrix',
    concept: 'Distributed Systems',
    isCapstone: true,
    description: 'Implement a Token Bucket rate limiter class with capacity = 3. Simulate 5 incoming requests and record boolean approvals [True/False].',
    starterCode: `class TokenBucket:
    def __init__(self, capacity):
        self.tokens = capacity
        
    def allow_request(self):
        if self.tokens > 0:
            self.tokens -= 1
            return True
        return False

limiter = TokenBucket(3)
results = [limiter.allow_request() for _ in range(5)]
print(results)`,
    expectedOutput: '[True, True, True, False, False]',
    hint: 'Subtract token when available and return True, else False.',
    xp: 800
  },
  {
    id: 108,
    title: 'Capstone 8: In-Memory SQL Aggregation Engine',
    taskName: 'Database Internals',
    icon: '🗄️',
    world: 'Realm 11: Capstone Matrix',
    concept: 'Query Engine & Aggregation',
    isCapstone: true,
    description: 'Implement in-memory SQL GROUP BY aggregation: calculate sum of salaries per department from employee records and print sorted result.',
    starterCode: `employees = [
    {"dept": "Engineering", "salary": 120000},
    {"dept": "Design", "salary": 90000},
    {"dept": "Engineering", "salary": 130000},
    {"dept": "Marketing", "salary": 85000},
]

totals = {}
for emp in employees:
    dept = emp["dept"]
    totals[dept] = totals.get(dept, 0) + emp["salary"]

print(sorted(totals.items()))`,
    expectedOutput: "[('Design', 90000), ('Engineering', 250000), ('Marketing', 85000)]",
    hint: 'Aggregate sums into dictionary and sort items list.',
    xp: 850
  },
  {
    id: 109,
    title: 'Capstone 9: SRE Service Health & Uptime Monitor',
    taskName: 'Site Reliability Engineering',
    icon: '🩺',
    world: 'Realm 11: Capstone Matrix',
    concept: 'SRE & Availability Metrics',
    isCapstone: true,
    description: 'Calculate system uptime percentage from probe pings (1=UP, 0=DOWN): (up_pings / total) * 100. Print formatted SLA report with health status.',
    starterCode: `pings = [1, 1, 1, 0, 1, 1, 1, 1, 0, 1]
total = len(pings)
up = sum(pings)
uptime = (up / total) * 100

print(f"Uptime: {uptime:.1f}%, Status: {'HEALTHY' if uptime >= 80 else 'DEGRADED'}")`,
    expectedOutput: 'Uptime: 80.0%, Status: HEALTHY',
    hint: 'sum(pings) gives total successful checks.',
    xp: 900
  },
  {
    id: 110,
    title: 'Capstone 10: Production ML Model Evaluation',
    taskName: 'ML Engineering',
    icon: '🧠',
    world: 'Realm 11: Capstone Matrix',
    concept: 'AI & Data Science Metrics',
    isCapstone: true,
    description: 'Evaluate a classification model: compute Precision, Recall, and harmonic mean F1-Score: 2 * (P * R) / (P + R). Print formatted metrics.',
    starterCode: `tp = 80
fp = 20
fn = 10

precision = tp / (tp + fp)
recall = tp / (tp + fn)
f1 = 2 * (precision * recall) / (precision + recall)

print(f"Precision: {precision:.2f}, Recall: {recall:.2f}, F1: {round(f1, 2)}")`,
    expectedOutput: 'Precision: 0.80, Recall: 0.89, F1: 0.84',
    hint: 'Precision = TP/(TP+FP), Recall = TP/(TP+FN), F1 = 2*(P*R)/(P+R).',
    xp: 1500
  }
];

