using Microsoft.EntityFrameworkCore.Migrations;

namespace PRY2020237.Repository.Migrations
{
    public partial class AddColumnInProject : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "themeNumber",
                table: "Project",
                nullable: false,
                defaultValue: 0);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "themeNumber",
                table: "Project");
        }
    }
}
