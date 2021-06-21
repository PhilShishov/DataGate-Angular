import { ITbDomInvestorType } from "./ITbDomInvestorType";
import { ITbDomIsoCountry } from "./ITbDomIsoCountry";
import { ITbDomIsoCurrency } from "./ITbDomIsoCurrency";
import { ITbDomShareStatus } from "./ITbDomShareStatus";
import { ITbDomShareType } from "./ITbDomShareType";
import { ITbShareClass } from "./ITbShareClass"

export interface ITbPrimeShareClass{
    scId: number
    scInitialDate: Date
    scEndDate: Date | null
    scOfficialShareClassName: string
    scShortShareClassName: string
    scInvestorType: number | null
    scShareType: number | null
    scCurrency: string
    scCountryIssue: string
    scUltimateParentCountryRisk: string
    scEmissionDate: Date | null
    scInceptionDate : Date | null
    scLastNav : Date | null
    scExpiryDate : Date | null
    scStatus: number | null
    scInitialPrice: number
    scAccountingCode: string
    scHedged: boolean | null
    scListed: boolean | null
    scBloomberMarket : string
    scBloombedCode : string
    scBloombedId : string
    scIsinCode : string
    scValorCode : string
    scFaCode : string
    scTaCode : string
    scWkn : string
    scDateBusinessYear: Date | null
    scProspectusCode : string
    scChangeComment : string
    scCommentTitle : string

    sc:ITbShareClass
    scCountryIssueNavigation: ITbDomIsoCountry
    scCurrencyNavigation: ITbDomIsoCurrency
    scInvestorTypeNavigation: ITbDomInvestorType
    scShareTypeNavigation: ITbDomShareType
    scStatusNavigation: ITbDomShareStatus
}
