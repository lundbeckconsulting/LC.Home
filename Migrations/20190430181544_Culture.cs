using Microsoft.EntityFrameworkCore.Migrations;

namespace LC.Home.Blitz.Migrations
{
    public partial class Culture : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "Culture",
                table: "HistoryItems",
                nullable: true);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Culture",
                table: "HistoryItems");
        }
    }
}
