import json

class GameData:
    def __init__(self, d):
        

def parse_json():
    data = ""
    with open('data.json', 'r') as fd:
        data = fd.read()
    seasongames = json.loads(data)

    for sg in seasongames:
        gd = GameDate(sg)

def main():
    res = parse_json()
    #print(f"keycnt {len(seasongames)}")

    balazs_ratios = []
    sn_goal_delta = (-1, None)
    sn_combined_shots = (-1, None)
    sn_combined_goals = (-1, None)

    for i in range(len(seasongames)):
        game = seasongames[i]
        winner = game[game['Winner']]
        loser = game[game['Loser']]
        #print(game)

        terms = calc_balazs_ratio(winner, loser)
        if terms:
            balazs_ratios.append((terms,game))

        goal_delta =  winner['G'][-1] - loser['G'][-1]
        if goal_delta > sn_goal_delta[0]: sn_goal_delta = (goal_delta, game)

        combined_goals = winner['G'][-1] + loser['G'][-1]
        if combined_goals > sn_combined_goals[0]: sn_combined_goals = (combined_goals, game)

        combined_shots = winner['S'][-1] + loser['S'][-1]
        if combined_shots > sn_combined_shots[0]: sn_combined_shots = (combined_shots, game)

        

balazs_ratios.sort(key=lambda tup: tup[0][-1])
for terms, game in balazs_ratios[-3:]:
    print(f"{terms[-1]}: {terms[:-1]}\nW: {game[game['Winner']]}\nL: {game[game['Loser']]}\n")

print(f"goal delta: {sn_goal_delta[0]} {sn_goal_delta[1]}\n")
print(f"combined G: {sn_combined_goals[0]} {sn_combined_goals[1]}\n")
print(f"combined S: {sn_combined_shots[0]} {sn_combined_shots[1]}\n")

def calc_balazs_ratio(winnerD, loserD):
    denom_nonzero = 1

    winnerScore = winnerD['G'][-1]
    loserScore = loserD['G'][-1]

    winnerShotCnt = winnerD['S'][-1]
    loserShotCnt = loserD['S'][-1]

    if winnerShotCnt > loserShotCnt:
        return None

    winnerShotsPerPeriod = winnerD['S']
    loserShotsPerPeriod = loserD['S']
    
    terms = [ (1 + winnerScore)/(1 + loserScore) ]

    for i in range(len(loserShotsPerPeriod)-1):
        losershot = loserShotsPerPeriod[i]
        winnershot = winnerShotsPerPeriod[i] + denom_nonzero
        tmp = losershot/winnershot
        terms.append(tmp)
    ratio = 0
    for term in terms:
        ratio += term

    terms.append(ratio)
    return terms




if __name__ == '__main__':
    main()
