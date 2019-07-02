using Microsoft.EntityFrameworkCore.Migrations;

namespace LC.Home.Blitz.Migrations
{
    public partial class culturetwo : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "Culture",
                table: "Projects",
                nullable: true);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Culture",
                table: "Projects");
        }
    }
}
