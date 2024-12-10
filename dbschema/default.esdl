module default {
    type Member {
        required address: str {
            constraint exclusive;
            constraint min_len_value(32);
            constraint regexp(r'[1-9A-HJ-NP-Za-km-z]{32,44}');
        }
        name: str;
    }

    type Draw {
        required link giveaway: Giveaway;
        required timeOpens: datetime;
        required timeCloses: datetime;
        required timeDraws: datetime;
        seed: str;
        winner: Member;
        required status: DrawStatus;
        multi link entries: DrawEntry;
        multi link events: DrawEvent;
    }

    scalar type DrawStatus extending enum<Pending,Open,Locked,Closed>;

    type DrawEntry {
        required address: str {
            constraint exclusive;
            constraint min_len_value(32);
            constraint regexp(r'[1-9A-HJ-NP-Za-km-z]{32,44}');
        }
        name: str;
        count: int64;
    }

    type DrawEvent {
        required timeStamp: int64;
        required sender: Member;
        required hash: str;
    }

    type Giveaway {
        required title: str;
        description: str;
        required active: bool;
        required price: float64;
        multi link providers: Partner;
        multi link criteria: EntryCriteria;
        multi link draws: Draw;
    };

    type EntryCriteria {
        type: str;
        parameter: str;
        value: int64;
    }

    type Partner {
        required name: str;
    }
}
