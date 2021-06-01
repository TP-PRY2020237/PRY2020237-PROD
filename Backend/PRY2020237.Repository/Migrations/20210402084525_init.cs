using Microsoft.EntityFrameworkCore.Migrations;

namespace PRY2020237.Repository.Migrations
{
    public partial class init : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<bool>(
                name: "isPrincipal",
                table: "PageView",
                nullable: false,
                defaultValue: false);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "isPrincipal",
                table: "PageView");
        }
    }
}
