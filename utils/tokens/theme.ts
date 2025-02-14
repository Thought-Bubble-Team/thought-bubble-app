import {Colors} from "@/utils/tokens/colors";

const Theme = {
    light: {
        background: Colors.white,
        backgroundSubtle: Colors.lightGrey,
        backgroundHarsh: Colors.black,
        accent: Colors.redOrange,
        accentSoft: Colors.softOrange,
        accentHard: Colors.darkRedOrange,
        text: Colors.black,
        textFaint: Colors.darkGrey,
        textAlt: Colors.white,
    } as const,
    dark: {
        background: Colors.white,
        backgroundSubtle: Colors.lightGrey,
        backgroundHarsh: Colors.black,
        accent: Colors.redOrange,
        accentSoft: Colors.softOrange,
        accentHard: Colors.darkRedOrange,
        text: Colors.black,
        textFaint: Colors.darkGrey,
        textAlt: Colors.white,
    }
}