CREATE MIGRATION m1tp2s34qrfz5pxk5puqfaljbygeaesfhszbgm4pyq5adaxf6j5qnq
    ONTO initial
{
  CREATE TYPE default::DrawEntry {
      CREATE REQUIRED PROPERTY address: std::str {
          CREATE CONSTRAINT std::exclusive;
          CREATE CONSTRAINT std::min_len_value(32);
          CREATE CONSTRAINT std::regexp('[1-9A-HJ-NP-Za-km-z]{32,44}');
      };
      CREATE PROPERTY count: std::int64;
      CREATE PROPERTY name: std::str;
  };
  CREATE TYPE default::Member {
      CREATE REQUIRED PROPERTY address: std::str {
          CREATE CONSTRAINT std::exclusive;
          CREATE CONSTRAINT std::min_len_value(32);
          CREATE CONSTRAINT std::regexp('[1-9A-HJ-NP-Za-km-z]{32,44}');
      };
      CREATE PROPERTY name: std::str;
  };
  CREATE TYPE default::DrawEvent {
      CREATE REQUIRED LINK sender: default::Member;
      CREATE REQUIRED PROPERTY hash: std::str;
      CREATE REQUIRED PROPERTY timeStamp: std::int64;
  };
  CREATE SCALAR TYPE default::DrawStatus EXTENDING enum<Pending, Open, Locked, Closed>;
  CREATE TYPE default::Draw {
      CREATE MULTI LINK entries: default::DrawEntry;
      CREATE MULTI LINK events: default::DrawEvent;
      CREATE LINK winner: default::Member;
      CREATE REQUIRED PROPERTY price: std::float64;
      CREATE PROPERTY seed: std::str;
      CREATE REQUIRED PROPERTY status: default::DrawStatus;
      CREATE REQUIRED PROPERTY timeCloses: std::datetime;
      CREATE REQUIRED PROPERTY timeDraws: std::datetime;
      CREATE REQUIRED PROPERTY timeOpens: std::datetime;
  };
  CREATE TYPE default::EntryCriteria {
      CREATE PROPERTY parameter: std::str;
      CREATE PROPERTY type: std::str;
      CREATE PROPERTY value: std::int64;
  };
  CREATE TYPE default::Partner {
      CREATE REQUIRED PROPERTY name: std::str;
  };
  CREATE TYPE default::Giveaway {
      CREATE MULTI LINK draws: default::Draw;
      CREATE MULTI LINK criteria: default::EntryCriteria;
      CREATE MULTI LINK providers: default::Partner;
      CREATE REQUIRED PROPERTY active: std::bool;
      CREATE PROPERTY description: std::str;
      CREATE REQUIRED PROPERTY title: std::str;
  };
  ALTER TYPE default::Draw {
      CREATE REQUIRED LINK giveaway: default::Giveaway;
  };
};
