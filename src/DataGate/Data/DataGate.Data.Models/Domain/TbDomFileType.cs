namespace DataGate.Data.Models.Domain
{
    using System.Collections.Generic;
    using DataGate.Data.Models.Entities;

    public partial class TbDomFileType
    {
        public TbDomFileType()
        {
            TbMapFilefund = new HashSet<TbMapFilefund>();
            TbMapFileshareclass = new HashSet<TbMapFileshareclass>();
            TbMapFilesubfund = new HashSet<TbMapFilesubfund>();
        }

        public int FiletypeId { get; set; }
        public string FiletypeDesc { get; set; }
        public int FiletypeEntity { get; set; }

        public virtual TbDomEntity FiletypeEntityNavigation { get; set; }
        public virtual ICollection<TbMapFilefund> TbMapFilefund { get; set; }
        public virtual ICollection<TbMapFileshareclass> TbMapFileshareclass { get; set; }
        public virtual ICollection<TbMapFilesubfund> TbMapFilesubfund { get; set; }
    }
}
