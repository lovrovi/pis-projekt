using System.Text.Json.Serialization;

namespace LibraryAPI.Models.Enums
{
    [JsonConverter(typeof(JsonStringEnumConverter))]
    public enum GroupType
    {
        Admin = 1,
        User = 2
    }
}
